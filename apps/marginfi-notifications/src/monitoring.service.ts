import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { DappMessageActionType, DialectSdk } from '@dialectlabs/sdk';
import {
  DialectSdkNotification,
  Monitors,
  Pipelines,
} from '@dialectlabs/monitor';
import { Solana } from '@dialectlabs/blockchain-sdk-solana';
import { Duration } from 'luxon';
import { StdoutNotificationSink } from './utils/StdoutNotificationSink';
import { AccountDataSource, AccountData } from './marginfi-data-source';
import { percentFormatter, percentFormatterDyn } from '@mrgnlabs/mrgn-common';

@Injectable()
export class MonitoringService implements OnApplicationBootstrap {
  private readonly stdoutNotificationSink = new StdoutNotificationSink();
  private readonly logger = new Logger(MonitoringService.name);

  constructor(
    private readonly sdk: DialectSdk<Solana>,
    private readonly dataSource: AccountDataSource,
  ) {}

  async onApplicationBootstrap() {
    this.logger.log(`Initializing monitoring service...`);
    const monitor = this.createMonitor();
    monitor.start().catch(console.error);
    this.logger.log(`Monitoring service initialized.`);
  }

  createMonitor() {
    const monitor = Monitors.builder({
      subscribersCacheTTL: Duration.fromObject({ minutes: 5 }),
      sdk: this.sdk,
    })
      .defineDataSource<AccountData>()
      .poll(
        (subscribers) => this.dataSource.pollData(subscribers),
        Duration.fromObject({ seconds: Number(process.env.POLLING_DURATION) }),
      )
      .transform<number, number>({
        keys: ['healthFactor'],
        pipelines: [
          Pipelines.threshold({
            type: 'falling-edge',
            threshold: Number(process.env.HEALTH_FACTOR_THRESHOLD) ?? 0,
          }),
        ],
      })
      .notify({
        // optional, must be set if your dapp has at least one custom notification type
        type: {
          id: 'health_update',
        },
      })
      .dialectSdk(
        ({ context: { origin } }) => {
          const notification: DialectSdkNotification = {
            title: `Your health factor fell below  ${percentFormatterDyn.format(Number(process.env.HEALTH_FACTOR_THRESHOLD))}`,
            message: `The value of your health factor just dropped under ${percentFormatterDyn.format(Number(process.env.HEALTH_FACTOR_THRESHOLD))}. It is now ${percentFormatterDyn.format(origin.healthFactor)}.`,
            actions: {
              type: DappMessageActionType.LINK,
              links: [
                {
                  label: 'View',
                  url: `https://app.marginfi.com/portfolio`,
                },
              ],
            },
          };
          this.logger.log(
            `Sending notification to ${origin.subscriber}: ${JSON.stringify(
              notification,
            )}`,
          );
          return notification;
        },
        // this.stdoutNotificationSink,
        { dispatch: 'unicast', to: ({ origin }) => origin.subscriber },
      )
      //
      // FINISH
      //
      .also()
      .transform<number, number>({
        keys: ['healthFactor'],
        pipelines: [
          Pipelines.threshold({
            type: 'falling-edge',
            threshold: 0,
          }),
        ],
      })
      .notify({
        // optional, must be set if your dapp has at least one custom notification type
        type: {
          id: 'liquidation_update',
        },
      })
      .dialectSdk(
        ({ context: { origin } }) => {
          const notification: DialectSdkNotification = {
            title: `Your health factor fell below 0`,
            message: `The value of your health factor just dropped under 0. You've been exposed to liquidation.`,
            actions: {
              type: DappMessageActionType.LINK,
              links: [
                {
                  label: 'View',
                  url: `https://app.marginfi.com/portfolio`,
                },
              ],
            },
          };
          this.logger.log(
            `Sending notification to ${origin.subscriber}: ${JSON.stringify(
              notification,
            )}`,
          );
          return notification;
        },
        // this.stdoutNotificationSink,
        { dispatch: 'unicast', to: ({ origin }) => origin.subscriber },
      )
      .and()
      .build();
    return monitor;
  }
}
