import {
  IconCaretUpDownFilled,
  IconCheck,
  IconChevronDown,
  IconChevronRight,
  IconBrandX,
  IconBrandApple,
  IconBrandTelegram,
  IconBrandDiscordFilled,
  IconWallet,
  IconSearch,
  IconX,
  IconLoader2,
  IconCopy,
  IconAlertTriangle,
  IconShare2,
  IconArrowDown,
  IconExternalLink,
  IconUserPlus,
  IconClockHour4,
} from "@tabler/icons-react";
import { cn } from "~/utils/themeUtils";

type IconProps = {
  size?: number;
  className?: string;
};

const IconBraveWallet = ({ size = 24, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21.4802 6.41622C21.365 6.08688 21.3741 5.72684 21.5056 5.40368V5.40368C21.7158 4.88696 21.6071 4.29517 21.2202 3.89325C20.963 3.62595 20.6454 3.29992 20.3036 2.95766C20.0695 2.72322 19.7631 2.59156 19.4422 2.52381C18.3656 2.29652 17.1973 2.08332 16.4703 1.25747V1.25747C15.9256 0.638739 15.1411 0.28418 14.3168 0.28418H12.021H9.72527C8.90094 0.28418 8.11644 0.638738 7.57174 1.25747V1.25747C6.84472 2.08332 5.6764 2.29652 4.59987 2.52381C4.27896 2.59156 3.97257 2.72322 3.73843 2.95766C3.39659 3.29992 3.07907 3.62595 2.82179 3.89325C2.43491 4.29517 2.32622 4.88696 2.53648 5.40368V5.40368C2.66797 5.72684 2.677 6.08688 2.56187 6.41622L2.35457 7.00925C2.15085 7.59204 2.12551 8.22016 2.28283 8.81715C2.83265 10.9037 4.14754 15.8966 4.33717 16.646C4.81117 18.5194 5.13549 19.2438 6.48266 20.193C7.82982 21.1422 10.2747 22.7908 10.6738 23.0406C11.073 23.2904 11.572 23.7159 12.021 23.7159C12.4701 23.7159 12.969 23.2904 13.3682 23.0406C13.7673 22.7908 16.2122 21.1422 17.5594 20.193C18.9065 19.2438 19.2309 18.5194 19.7049 16.646C19.8944 15.8966 21.2094 10.9037 21.7592 8.81716C21.9165 8.22016 21.8912 7.59204 21.6875 7.00924L21.4802 6.41622Z"
      fill="url(#paint0_linear_1_34)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.566 4.5063C16.1422 4.5063 17.7269 4.82498 18.6528 6.10063C19.2169 6.87781 19.7169 7.65041 19.7169 7.94713C19.7169 8.6278 19.3859 8.80745 19.0531 9.1613C18.7203 9.51515 17.2668 11.0605 17.0802 11.259C16.8935 11.4574 16.5049 11.7583 16.7335 12.2999C16.9621 12.8415 17.2993 13.5307 16.9243 14.2297C16.5493 14.9287 15.9069 15.3953 15.4953 15.3181C15.0836 15.2409 14.1169 14.7351 13.7614 14.5041C13.4059 14.273 12.2792 13.3426 12.2792 12.9866C12.2792 12.6307 13.4439 11.9915 13.659 11.8463C13.8743 11.7011 14.8557 11.139 14.8758 10.9184C14.8959 10.6977 14.8882 10.633 14.5986 10.0879C14.3089 9.54272 13.7873 8.81524 13.8742 8.3312C13.961 7.84722 14.8022 7.59553 15.4025 7.36852C16.0028 7.14157 17.1586 6.71288 17.3029 6.64624C17.4474 6.57954 17.4101 6.51605 16.9726 6.47453C16.5353 6.43302 15.2941 6.26806 14.7345 6.42423C14.175 6.58039 13.219 6.81799 13.1415 6.94398C13.0641 7.06998 12.9958 7.07422 13.0753 7.50885C13.1548 7.94348 13.5643 10.029 13.604 10.3994C13.6437 10.7699 13.7215 11.0148 13.3226 11.1061C12.9236 11.1974 12.2521 11.356 12.0213 11.356C11.7905 11.356 11.119 11.1974 10.72 11.1061C10.3211 11.0148 10.3988 10.7699 10.4386 10.3994C10.4783 10.029 10.8877 7.94348 10.9673 7.50885C11.0468 7.07422 10.9784 7.06998 10.9011 6.94398C10.8236 6.81799 9.86758 6.58039 9.30801 6.42423C8.74844 6.26806 7.50729 6.43302 7.06991 6.47453C6.63253 6.51605 6.59521 6.57954 6.73961 6.64624C6.884 6.71288 8.03982 7.14157 8.64006 7.36852C9.24035 7.59553 10.0816 7.84722 10.1684 8.3312C10.2553 8.81524 9.73361 9.54272 9.44402 10.0879C9.15438 10.633 9.1467 10.6977 9.16681 10.9184C9.18686 11.139 10.1683 11.7011 10.3835 11.8463C10.5987 11.9915 11.7634 12.6307 11.7634 12.9866C11.7634 13.3426 10.6367 14.273 10.2812 14.5041C9.92571 14.7351 8.95899 15.2409 8.54736 15.3181C8.13572 15.3953 7.49332 14.9287 7.11831 14.2297C6.74335 13.5307 7.08054 12.8415 7.30906 12.2999C7.53763 11.7583 7.1491 11.4574 6.96239 11.259C6.77578 11.0605 5.32224 9.51515 4.98944 9.1613C4.65664 8.80745 4.32568 8.6278 4.32568 7.94713C4.32568 7.65041 4.82572 6.87781 5.38982 6.10063C6.31573 4.82498 7.9004 4.5063 9.47665 4.5063V4.5063C9.77602 4.5063 10.4247 4.25652 11.0234 4.05669V4.05669C11.6692 3.84115 12.3734 3.84115 13.0192 4.05669V4.05669C13.6179 4.25652 14.2666 4.5063 14.566 4.5063V4.5063ZM15.1131 16.2641C15.276 16.3662 15.1766 16.5587 15.0283 16.6637C14.8799 16.7688 12.886 18.3146 12.6925 18.4855C12.499 18.6564 12.2146 18.9386 12.0213 18.9386C11.828 18.9386 11.5435 18.6564 11.3501 18.4855C11.1565 18.3146 9.1627 16.7688 9.01432 16.6637C8.86593 16.5587 8.76664 16.3662 8.92949 16.2641C9.0924 16.1621 9.60198 15.9044 10.3052 15.5401C11.0082 15.1758 11.8845 14.8661 12.0213 14.8661C12.1581 14.8661 13.0343 15.1758 13.7375 15.5401C14.4406 15.9044 14.9502 16.1621 15.1131 16.2641Z"
      fill="white"
    />
    <path
      d="M17.8271 2.56825C17.5193 2.63379 17.5274 2.45789 17.3194 2.22167L16.4706 1.25747C15.9259 0.638739 15.1414 0.28418 14.3171 0.28418H12.0214H9.72561C8.90128 0.28418 8.11678 0.638738 7.57209 1.25747L6.72327 2.22167C6.51532 2.45789 6.52346 2.63379 6.21564 2.56825V2.56825C5.46536 2.4085 5.25456 2.9721 5.96013 3.27313C6.20979 3.37965 6.44542 3.51971 6.6444 3.70343C6.87472 3.91609 7.13169 4.11523 7.43989 4.17253C8.11083 4.29728 9.26665 4.50634 9.47671 4.50634C9.77608 4.50634 10.4247 4.25655 11.0235 4.05672V4.05672C11.6693 3.84119 12.3735 3.84119 13.0193 4.05672V4.05672C13.618 4.25655 14.2666 4.50634 14.566 4.50634C14.7761 4.50634 15.9319 4.29728 16.6028 4.17253C16.911 4.11523 17.168 3.91609 17.3983 3.70343C17.5973 3.51971 17.8329 3.37965 18.0826 3.27313C18.7882 2.9721 18.5774 2.4085 17.8271 2.56825V2.56825Z"
      fill="url(#paint1_linear_1_34)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1_34"
        x1="2.04199"
        y1="1188.4"
        x2="1997.85"
        y2="1188.4"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF5500" />
        <stop offset="0.409877" stopColor="#FF5500" />
        <stop offset="0.581981" stopColor="#FF2000" />
        <stop offset="1" stopColor="#FF2000" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_1_34"
        x1="39.328"
        y1="214.371"
        x2="1660.26"
        y2="214.371"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF452A" />
        <stop offset="1" stopColor="#FF2000" />
      </linearGradient>
    </defs>
  </svg>
);

const IconCoinbaseWallet = ({ size = 24, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g clipPath="url(#clip0_3_2)">
      <path
        d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
        fill="#0052FF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.5625 12C3.5625 16.6599 7.34009 20.4375 12 20.4375C16.6599 20.4375 20.4375 16.6599 20.4375 12C20.4375 7.34009 16.6599 3.5625 12 3.5625C7.34009 3.5625 3.5625 7.34009 3.5625 12ZM9.84375 9.28125C9.53309 9.28125 9.28125 9.53309 9.28125 9.84375V14.1562C9.28125 14.4669 9.53309 14.7188 9.84375 14.7188H14.1562C14.4669 14.7188 14.7188 14.4669 14.7188 14.1562V9.84375C14.7188 9.53309 14.4669 9.28125 14.1562 9.28125H9.84375Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_3_2">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const IconBrandGoogle = ({ size = 24, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z"
      fill="#4285F4"
    />
    <path
      d="M12.0002 23C14.9702 23 17.4602 22.02 19.2802 20.34L15.7102 17.57C14.7302 18.23 13.4802 18.63 12.0002 18.63C9.14018 18.63 6.71018 16.7 5.84018 14.1H2.18018V16.94C3.99018 20.53 7.70018 23 12.0002 23Z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09C5.62 13.43 5.49 12.73 5.49 12C5.49 11.27 5.62 10.57 5.84 9.91001V7.07001H2.18C1.43 8.55001 1 10.22 1 12C1 13.78 1.43 15.45 2.18 16.93L5.03 14.71L5.84 14.09Z"
      fill="#FBBC05"
    />
    <path
      d="M12.0002 5.38C13.6202 5.38 15.0602 5.94 16.2102 7.02L19.3602 3.87C17.4502 2.09 14.9702 1 12.0002 1C7.70018 1 3.99018 3.47 2.18018 7.07L5.84018 9.91C6.71018 7.31 9.14018 5.38 12.0002 5.38Z"
      fill="#EA4335"
    />
  </svg>
);

const IconPhantomWallet = ({ size = 24, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.77731 17.0881C8.43291 19.0838 6.18014 21.6093 3.18249 21.6093C1.76539 21.6093 0.402832 21.0441 0.402832 18.5893C0.402832 12.3373 9.21411 2.65918 17.3896 2.65918C22.0405 2.65918 23.8936 5.78514 23.8936 9.33498C23.8936 13.8915 20.8414 19.1014 17.8074 19.1014C16.8445 19.1014 16.3722 18.5893 16.3722 17.7769C16.3722 17.5649 16.4085 17.3353 16.4812 17.0881C15.4456 18.8012 13.4472 20.3907 11.5759 20.3907C10.2133 20.3907 9.52297 19.5606 9.52297 18.395C9.52297 17.9711 9.61382 17.5296 9.77731 17.0881ZM20.8236 9.21175C20.8236 10.2461 20.1936 10.7634 19.4889 10.7634C18.7735 10.7634 18.1542 10.2461 18.1542 9.21175C18.1542 8.17736 18.7735 7.66018 19.4889 7.66018C20.1936 7.66018 20.8236 8.17736 20.8236 9.21175ZM16.8197 9.21175C16.8197 10.2461 16.1897 10.7634 15.485 10.7634C14.7696 10.7634 14.1503 10.2461 14.1503 9.21175C14.1503 8.17736 14.7696 7.66018 15.485 7.66018C16.1897 7.66018 16.8197 8.17736 16.8197 9.21175Z"
      fill="#A99FEC"
    />
  </svg>
);

const IconSolflareWallet = ({ size = 24, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M11.8125 1.54691C11.9414 1.59085 11.9414 1.59085 12.0469 1.68753C12.2021 2.05515 12.2429 2.44162 12.2936 2.83417C12.3094 2.95666 12.3257 3.07908 12.3421 3.20149C12.377 3.46142 12.4112 3.72144 12.4453 3.98148C12.4849 4.28293 12.5248 4.58434 12.5652 4.88568C12.5812 5.00554 12.5967 5.12545 12.6122 5.24537C12.6958 5.87823 12.778 6.49002 13.3096 6.90823C13.6728 7.15849 14.0454 7.25647 14.4844 7.21878C14.9533 7.13191 15.298 6.89148 15.6224 6.55154C15.7026 6.46928 15.7859 6.3943 15.873 6.31937C16.0444 6.17155 16.211 6.01912 16.377 5.86527C16.5956 5.66264 16.8158 5.46199 17.0378 5.26303C17.1718 5.14231 17.3047 5.02049 17.4375 4.89847C17.6086 4.7413 17.7802 4.58488 17.9531 4.42972C18.2206 4.18957 18.4853 3.94638 18.75 3.70316C19.0524 3.42527 19.3554 3.14813 19.6613 2.87405C19.771 2.77489 19.8797 2.67463 19.988 2.57399C20.0825 2.48667 20.1776 2.40021 20.2731 2.31403C20.3202 2.27137 20.367 2.22847 20.4137 2.1853C20.4803 2.12391 20.5482 2.06389 20.6162 2.00394C20.6552 1.96889 20.6942 1.93384 20.7343 1.89774C20.9036 1.80354 21.0032 1.82834 21.1875 1.87503C21.2812 1.9512 21.2812 1.9512 21.3281 2.06253C21.3175 2.3425 21.2421 2.46386 21.0469 2.66019C20.9994 2.70915 20.952 2.75822 20.9048 2.8074C20.8693 2.84398 20.8693 2.84398 20.8332 2.88129C20.7343 2.98645 20.6447 3.09817 20.5547 3.21097C20.4047 3.39736 20.2488 3.57503 20.0859 3.75003C19.8849 3.96613 19.6967 4.18962 19.5115 4.41965C19.3649 4.59686 19.2088 4.76463 19.053 4.93381C18.9409 5.05872 18.8347 5.18667 18.7295 5.31741C18.558 5.52999 18.3775 5.73075 18.1916 5.93052C18.0134 6.12321 17.848 6.32454 17.6834 6.52902C17.574 6.66128 17.46 6.78781 17.3438 6.91409C17.1482 7.1266 16.9637 7.3456 16.7829 7.57071C16.7021 7.66961 16.6186 7.76352 16.5322 7.85745C16.262 8.16974 16.1551 8.54873 16.1748 8.95609C16.2198 9.44763 16.4266 9.8138 16.7937 10.1382C17.2443 10.4214 17.7104 10.4553 18.2288 10.4999C18.3706 10.5121 18.5122 10.5252 18.6539 10.5385C18.9544 10.5665 19.255 10.5934 19.5557 10.6201C19.9047 10.6514 20.2538 10.6832 20.6027 10.7157C20.7419 10.7285 20.8812 10.7406 21.0205 10.7527C21.1061 10.7606 21.1918 10.7685 21.2774 10.7764C21.3351 10.7812 21.3351 10.7812 21.3938 10.786C21.6321 10.8089 21.8187 10.8563 22.0312 10.9688C22.141 11.1334 22.1483 11.1968 22.125 11.3907C22.0323 11.5372 21.9744 11.6121 21.8089 11.67C21.733 11.6814 21.733 11.6814 21.6555 11.693C21.5954 11.7025 21.5352 11.712 21.4732 11.7218C21.4403 11.7265 21.4073 11.7313 21.3734 11.7361C21.2669 11.7514 21.1607 11.7679 21.0544 11.7846C20.839 11.8182 20.6235 11.8505 20.4078 11.8827C19.9308 11.954 19.4539 12.0265 18.9771 12.0998C18.7741 12.1309 18.5709 12.1614 18.3676 12.1914C18.2384 12.2106 18.1093 12.2303 17.9802 12.2501C17.8909 12.2637 17.8015 12.2766 17.7121 12.2895C17.2012 12.3687 16.6953 12.5238 16.3705 12.9529C16.1176 13.3522 16.0118 13.7559 16.0999 14.2255C16.2476 14.7899 16.6556 15.1879 17.0313 15.6141C17.1924 15.7978 17.3501 15.9844 17.5069 16.1717C17.5833 16.2629 17.6606 16.3534 17.7387 16.4431C18.0172 16.7711 18.0172 16.7711 18.0615 16.96C18.0469 17.1094 18.0469 17.1094 17.9502 17.2471C17.7827 17.3647 17.7323 17.374 17.5312 17.3438C17.3867 17.264 17.2597 17.1641 17.1299 17.0625C17.0915 17.0334 17.0532 17.0043 17.0136 16.9744C16.8887 16.8794 16.7646 16.7836 16.6406 16.6875C16.5103 16.5872 16.38 16.4869 16.2494 16.3869C16.1668 16.3235 16.0844 16.2597 16.0023 16.1957C15.4844 15.796 15.0203 15.4938 14.3438 15.5625C13.8661 15.6545 13.5183 15.8847 13.2347 16.2805C12.9069 16.8605 12.9478 17.6731 12.8948 18.3236C12.8867 18.4217 12.8785 18.5198 12.8704 18.6179C12.849 18.8743 12.8279 19.1307 12.8068 19.3871C12.773 19.7986 12.7389 20.21 12.7047 20.6215C12.6929 20.7645 12.6812 20.9076 12.6695 21.0507C12.6622 21.1386 12.6549 21.2265 12.6476 21.3144C12.6444 21.3538 12.6413 21.3933 12.638 21.4339C12.5871 22.0435 12.5871 22.0435 12.4834 22.1895C12.3474 22.285 12.2599 22.3091 12.0938 22.3125C11.9283 22.2373 11.8675 22.184 11.7656 22.0313C11.7442 21.9416 11.7442 21.9416 11.7304 21.8384C11.7249 21.7992 11.7195 21.76 11.7139 21.7196C11.7083 21.6767 11.7027 21.6338 11.697 21.5896C11.6877 21.5217 11.6877 21.5217 11.6782 21.4524C11.6648 21.3539 11.6516 21.2554 11.6385 21.1568C11.6177 21.0005 11.5965 20.8442 11.5751 20.6879C11.5298 20.3555 11.4851 20.023 11.4404 19.6905C11.3888 19.3065 11.3369 18.9226 11.2846 18.5387C11.2638 18.3855 11.2434 18.2322 11.223 18.0789C11.1028 16.9646 11.1028 16.9646 10.4544 16.0915C10.0373 15.8271 9.57892 15.7733 9.09924 15.8714C8.63087 16.0162 8.2866 16.3583 7.95245 16.7035C7.84377 16.8127 7.72722 16.9116 7.6106 17.0122C7.47194 17.1341 7.33655 17.2593 7.20117 17.3848C6.98253 17.5874 6.76233 17.7881 6.54034 17.987C6.40637 18.1078 6.27342 18.2296 6.14062 18.3516C5.96957 18.5088 5.79789 18.6652 5.625 18.8203C5.3575 19.0605 5.09282 19.3037 4.82812 19.5469C4.52574 19.8248 4.22263 20.1017 3.91699 20.376C3.78253 20.4973 3.649 20.6197 3.51562 20.7422C3.33534 20.9077 3.1549 21.073 2.97363 21.2373C2.93683 21.2707 2.90004 21.3042 2.86212 21.3386C2.73403 21.4492 2.65528 21.5125 2.48438 21.5303C2.34375 21.5157 2.34375 21.5157 2.25879 21.4571C2.19038 21.3563 2.15968 21.3109 2.15625 21.1875C2.27456 20.9553 2.40565 20.7792 2.58691 20.5899C2.75533 20.4113 2.91662 20.2307 3.07031 20.0391C3.22028 19.8527 3.37621 19.675 3.53906 19.5C3.74014 19.2839 3.92832 19.0604 4.11346 18.8304C4.26008 18.6532 4.41622 18.4854 4.57196 18.3163C4.68408 18.1913 4.79028 18.0634 4.89551 17.9326C5.06696 17.7201 5.24748 17.5193 5.43336 17.3195C5.61159 17.1269 5.777 16.9255 5.94159 16.721C6.05101 16.5888 6.165 16.4623 6.28125 16.336C6.47487 16.1256 6.65693 15.9084 6.83606 15.6856C6.93268 15.5684 7.03347 15.4571 7.13672 15.3457C7.51142 14.9292 7.6184 14.5609 7.6062 14.0074C7.57676 13.5835 7.39277 13.3159 7.12042 12.9996C6.66535 12.6352 6.15955 12.6014 5.59921 12.5519C5.45248 12.5389 5.3059 12.5247 5.15931 12.5103C4.73732 12.469 4.3151 12.4305 3.8928 12.3926C3.62742 12.3688 3.36214 12.3441 3.09689 12.3189C2.94636 12.3049 2.79576 12.2922 2.64512 12.2795C2.55277 12.2709 2.46044 12.2622 2.3681 12.2534C2.32621 12.2503 2.28432 12.2471 2.24116 12.2438C2.03918 12.2234 1.94307 12.2039 1.77845 12.0767C1.6875 11.9532 1.6875 11.9532 1.66113 11.7862C1.6875 11.625 1.6875 11.625 1.75781 11.5166C2.01581 11.3425 2.36807 11.3207 2.67166 11.2759C2.71203 11.2698 2.75241 11.2636 2.794 11.2573C2.88105 11.2442 2.96811 11.2311 3.05518 11.2181C3.19342 11.1974 3.33161 11.1764 3.46979 11.1553C3.86246 11.0954 4.25518 11.0358 4.64801 10.9769C4.88892 10.9408 5.12975 10.9041 5.37054 10.8672C5.4618 10.8533 5.55308 10.8395 5.6444 10.826C6.62432 10.6921 6.62432 10.6921 7.40625 10.125C7.6781 9.75614 7.77642 9.33483 7.71167 8.88229C7.61546 8.41803 7.36708 8.11421 7.05778 7.76963C6.93085 7.62767 6.80685 7.48322 6.68262 7.3389C6.65938 7.31233 6.63615 7.28575 6.61221 7.25838C6.24644 6.83596 6.24644 6.83596 6.21094 6.58304C6.2392 6.38871 6.2721 6.31484 6.42188 6.18753C6.65167 6.12349 6.73073 6.10815 6.94739 6.21463C7.15713 6.34187 7.34653 6.49483 7.53809 6.64749C7.61324 6.70633 7.68843 6.7651 7.76367 6.82382C7.87824 6.91341 7.99254 7.00329 8.10645 7.09372C8.43882 7.34464 8.79994 7.46475 9.21094 7.52347C9.72193 7.45047 10.1719 7.29397 10.4912 6.87216C10.7176 6.51796 10.7894 6.16095 10.8205 5.74838C10.8251 5.6925 10.8251 5.6925 10.8298 5.6355C10.8364 5.55528 10.8428 5.47505 10.8491 5.39481C10.859 5.26742 10.8694 5.14008 10.8799 5.01273C10.902 4.74225 10.9237 4.47173 10.9453 4.2012C10.9704 3.88779 10.9957 3.5744 11.0214 3.26105C11.0315 3.13629 11.0413 3.0115 11.0511 2.88671C11.1327 1.87146 11.1327 1.87146 11.2969 1.66116C11.4737 1.53405 11.5946 1.53213 11.8125 1.54691Z"
      fill="#FC741F"
    />
    <path
      d="M0.843601 11.2969C1.01531 11.4149 1.06643 11.4939 1.12778 11.6924C1.12413 11.9007 1.07201 11.9842 0.937351 12.1406C0.812727 12.2395 0.75046 12.2344 0.588718 12.2315C0.388453 12.1788 0.313128 12.1159 0.187351 11.9531C0.116664 11.7853 0.139606 11.7213 0.19907 11.5459C0.347586 11.2648 0.551767 11.2477 0.843601 11.2969Z"
      fill="#FEA911"
    />
    <path
      d="M12.2738 22.9468C12.4224 22.9791 12.5064 23.0469 12.6093 23.1562C12.6831 23.3039 12.6725 23.415 12.6561 23.5781C12.5414 23.7659 12.4721 23.8438 12.2606 23.9092C12.0701 23.9058 11.9712 23.869 11.8124 23.7656C11.6963 23.5914 11.6829 23.4518 11.7186 23.25C11.8307 22.9915 12.0079 22.929 12.2738 22.9468Z"
      fill="#FB3E2D"
    />
    <path
      d="M23.5312 10.8281C23.7034 10.9365 23.7927 11.0076 23.8623 11.2002C23.8579 11.4169 23.7834 11.5557 23.6367 11.7129C23.4802 11.7912 23.376 11.7895 23.2031 11.7656C23.0137 11.6498 22.937 11.5809 22.8721 11.3672C22.8761 11.1418 22.9446 11.0423 23.0977 10.8838C23.2538 10.8013 23.357 10.8041 23.5312 10.8281Z"
      fill="#FB3E2D"
    />
    <path
      d="M11.8592 2.14063C12.0219 2.28597 12.0858 2.37256 12.12 2.58887C12.0896 2.77456 12.0379 2.85257 11.9061 2.98438C11.756 3.05942 11.6002 3.05466 11.4374 3.03126C11.3057 2.94718 11.226 2.88975 11.1561 2.75001C11.1385 2.59762 11.1249 2.47608 11.2035 2.33949C11.4027 2.09189 11.5569 2.06243 11.8592 2.14063Z"
      fill="#FEA412"
    />
  </svg>
);

const IconBackpackWallet = ({ size = 24, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <mask
      id="mask0_12_61"
      style={{ maskType: "luminance" }}
      maskUnits="userSpaceOnUse"
      x="4"
      y="0"
      width="17"
      height="24"
    >
      <path d="M20.5 0H4V24H20.5V0Z" fill="white" />
    </mask>
    <g mask="url(#mask0_12_61)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.813 1.88707C14.6853 1.88707 15.5035 2.00401 16.2611 2.22089C15.5194 0.492254 13.9795 0 12.2656 0C10.5483 0 9.00565 0.494189 8.26562 2.23107C9.01765 2.00657 9.83235 1.88707 10.7017 1.88707H13.813ZM10.5022 3.62256C6.36003 3.62256 4 6.88114 4 10.9008V15.0299C4 15.432 4.33579 15.7499 4.75 15.7499H19.7499C20.1642 15.7499 20.5 15.432 20.5 15.0299V10.9008C20.5 6.88114 17.7557 3.62256 13.6135 3.62256H10.5022ZM12.2441 10.9365C13.6939 10.9365 14.8691 9.76127 14.8691 8.31152C14.8691 6.86177 13.6939 5.68653 12.2441 5.68653C10.7944 5.68653 9.61914 6.86177 9.61914 8.31152C9.61914 9.76127 10.7944 10.9365 12.2441 10.9365ZM4 18.177C4 17.7751 4.33579 17.4493 4.75 17.4493H19.7499C20.1642 17.4493 20.5 17.7751 20.5 18.177V22.544C20.5 23.3479 19.8285 23.9997 19 23.9997H5.5C4.67157 23.9997 4 23.3479 4 22.544V18.177Z"
        fill="white"
      />
    </g>
  </svg>
);

const IconWalletConnectWallet = ({ size = 24, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g clipPath="url(#clip0_1_63)">
      <path
        d="M5.50387 7.53997C9.09158 4.15334 14.9084 4.15334 18.4962 7.53997L18.9279 7.94755C19.1073 8.1169 19.1073 8.39142 18.9279 8.56077L17.4509 9.95504C17.3612 10.0397 17.2158 10.0397 17.126 9.95504L16.5319 9.39417C14.029 7.03155 9.97101 7.03155 7.46811 9.39417L6.83177 9.99481C6.74211 10.0795 6.5967 10.0795 6.50699 9.99481L5.02995 8.60054C4.85051 8.43119 4.85051 8.15667 5.02995 7.98732L5.50387 7.53997ZM21.5508 10.4235L22.8655 11.6644C23.0448 11.8337 23.0448 12.1082 22.8655 12.2776L16.9379 17.873C16.7585 18.0423 16.4677 18.0423 16.2883 17.873L12.0812 13.9018C12.0364 13.8594 11.9637 13.8594 11.9188 13.9018L7.71189 17.873C7.53251 18.0423 7.24164 18.0423 7.06226 17.873L1.13454 12.2775C0.955154 12.1082 0.955154 11.8337 1.13454 11.6643L2.44913 10.4234C2.62852 10.2541 2.91936 10.2541 3.09875 10.4234L7.30586 14.3947C7.35066 14.437 7.42337 14.437 7.46822 14.3947L11.6751 10.4234C11.8545 10.2541 12.1453 10.2541 12.3247 10.4234L16.5318 14.3947C16.5767 14.437 16.6494 14.437 16.6942 14.3947L20.9012 10.4235C21.0807 10.2541 21.3715 10.2541 21.5508 10.4235Z"
        fill="#3396FF"
      />
    </g>
    <defs>
      <clipPath id="clip0_1_63">
        <rect width={size} height={size} fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const IconGlowWallet = ({ size = 24, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g clipPath="url(#clip0_1_93)">
      <path
        d="M20.4162 20.5541C18.1738 22.7658 15.1496 24.004 12 24C8.85757 24.0047 5.83965 22.7719 3.59924 20.5684C8.51329 16.6979 15.4966 16.6934 20.4162 20.5541ZM20.5541 20.4162C22.7658 18.1738 24.004 15.1496 24 12C24 8.72948 22.6918 5.76561 20.5706 3.60034C16.6979 8.52873 16.6934 15.4977 20.5541 20.4162ZM20.4339 3.46356C15.5077 7.34406 8.50226 7.33855 3.58048 3.44922C5.82306 1.23529 8.84871 -0.00422474 12 1.08194e-05C15.2871 1.08194e-05 18.2664 1.32256 20.4339 3.46356ZM3.44922 3.58048C1.23529 5.82306 -0.00422474 8.84871 1.08194e-05 12C1.08194e-05 15.2882 1.32256 18.2664 3.46356 20.4339C7.34406 15.5077 7.33855 8.50226 3.44922 3.58048Z"
        fill="#B43AE8"
      />
    </g>
    <defs>
      <clipPath id="clip0_1_93">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const IconTrustWallet = ({ size = 24, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g clipPath="url(#clip0_6_2)">
      <path
        d="M3.42871 7.51045L11.9589 4.72638V24C5.86584 21.43 3.42871 16.5046 3.42871 13.7209V7.51045Z"
        fill="#0500FF"
      />
      <path
        d="M20.4891 7.51045L11.959 4.72638V24C18.052 21.43 20.4891 16.5046 20.4891 13.7209V7.51045Z"
        fill="url(#paint0_linear_6_2)"
      />
      <path
        d="M6.78749 0.0954895H7.97775V0.762048C8.36795 0.162877 8.81671 0.0954895 9.47385 0.0954895V1.27381H9.17455C8.38721 1.27381 8.01011 1.64425 8.01011 2.37781V3.63006H6.78711V0.0954895H6.78749Z"
        fill="#0500FF"
      />
      <path
        d="M13.4463 3.6297H12.2233V3.29276C11.9564 3.60274 11.5924 3.73713 11.1436 3.73713C10.2916 3.73713 9.81006 3.2323 9.81006 2.30312V0.0951233H11.0331V2.02741C11.0331 2.46485 11.2476 2.72054 11.6116 2.72054C11.9756 2.72054 12.2233 2.4714 12.2233 2.04744V0.0951233H13.4463V3.6297Z"
        fill="#0500FF"
      />
      <path
        d="M13.7456 2.53878H14.8908C14.9432 2.79447 15.1184 2.9019 15.541 2.9019C15.8858 2.9019 16.0876 2.82142 16.0876 2.67317C16.0876 2.55842 15.9898 2.48448 15.7105 2.42403L14.7868 2.21532C14.1689 2.07438 13.8565 1.71742 13.8565 1.14482C13.8565 0.390463 14.4093 0 15.4825 0C16.5556 0 17.0826 0.380451 17.1739 1.19526H16.0356C16.0163 0.980008 15.7948 0.848313 15.4308 0.848313C15.1385 0.848313 14.9497 0.94227 14.9497 1.08398C14.9497 1.20489 15.073 1.29923 15.3207 1.36046L16.2898 1.59612C16.9269 1.75054 17.2332 2.074 17.2332 2.59923C17.2332 3.32663 16.6022 3.75753 15.5294 3.75753C14.4567 3.75753 13.7471 3.29313 13.7471 2.53878H13.746H13.7456Z"
        fill="#0500FF"
      />
      <path
        d="M20.4892 1.19487V0.0954895H17.4712V1.19525H18.3718V3.62968H19.5882V1.19448H20.4892V1.19487Z"
        fill="#0500FF"
      />
      <path
        d="M6.4477 1.19487V0.0954895H3.42969V1.19525H4.33028V3.62968H5.54672V1.19448H6.44731L6.4477 1.19487Z"
        fill="#0500FF"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_6_2"
        x1="18.2411"
        y1="3.38286"
        x2="11.7486"
        y2="23.7266"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.02" stop-color="#0000FF" />
        <stop offset="0.08" stop-color="#0094FF" />
        <stop offset="0.16" stop-color="#48FF91" />
        <stop offset="0.42" stop-color="#0094FF" />
        <stop offset="0.68" stop-color="#0038FF" />
        <stop offset="0.9" stop-color="#0500FF" />
      </linearGradient>
      <clipPath id="clip0_6_2">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const IconLoader = ({ size = 24, className }: IconProps) => (
  <IconLoader2 size={size} className={cn("animate-spin", className)} />
);

const IconPieChart = ({ size = 24, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M11 2.04932V12.9999H21.9506C21.4489 18.0533 17.1853 21.9999 12 21.9999C6.47715 21.9999 2 17.5228 2 11.9999C2 6.81459 5.94668 2.55104 11 2.04932ZM13 2.04932C17.7244 2.51839 21.4816 6.27552 21.9506 10.9999H13V2.04932Z" />
  </svg>
);

const IconReceiveMoney = ({ size = 24, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 512 512"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M258 21.89c-.5 0-1.2 0-1.8.12-4.6.85-10.1 5.1-13.7 14.81-3.8 9.7-4.6 23.53-1.3 38.34 3.4 14.63 10.4 27.24 18.2 34.94 7.6 7.7 14.5 9.8 19.1 9 4.8-.7 10.1-5.1 13.7-14.7 3.8-9.64 4.8-23.66 1.4-38.35-3.5-14.8-10.4-27.29-18.2-34.94-6.6-6.8-12.7-9.22-17.4-9.22zM373.4 151.4c-11 .3-24.9 3.2-38.4 8.9-15.6 6.8-27.6 15.9-34.2 24.5-6.6 8.3-7.2 14.6-5.1 18.3 2.2 3.7 8.3 7.2 20 7.7 11.7.7 27.5-2.2 43-8.8 15.5-6.7 27.7-15.9 34.3-24.3 6.6-8.3 7.1-14.8 5-18.5-2.1-3.8-8.3-7.1-20-7.5-1.6-.3-3-.3-4.6-.3zm-136.3 92.9c-6.6.1-12.6.9-18 2.3-11.8 3-18.6 8.4-20.8 14.9-2.5 6.5 0 14.3 7.8 22.7 8.2 8.2 21.7 16.1 38.5 20.5 16.7 4.4 32.8 4.3 44.8 1.1 12.1-3.1 18.9-8.6 21.1-15 2.3-6.5 0-14.2-8.1-22.7-7.9-8.2-21.4-16.1-38.2-20.4-9.5-2.5-18.8-3.5-27.1-3.4zm160.7 58.1L336 331.7c4.2.2 14.7.5 14.7.5l6.6 8.7 54.7-28.5-14.2-10zm-54.5.1l-57.4 27.2c5.5.3 18.5.5 23.7.8l49.8-23.6-16.1-4.4zm92.6 10.8l-70.5 37.4 14.5 18.7 74.5-44.6-18.5-11.5zm-278.8 9.1a40.33 40.33 0 0 0-9 1c-71.5 16.5-113.7 17.9-126.2 17.9H18v107.5s11.6-1.7 30.9-1.8c37.3 0 103 6.4 167 43.8 3.4 2.1 10.7 2.9 19.8 2.9 24.3 0 61.2-5.8 69.7-9C391 452.6 494 364.5 494 364.5l-32.5-28.4s-79.8 50.9-89.9 55.8c-91.1 44.7-164.9 16.8-164.9 16.8s119.9 3 158.4-27.3l-22.6-34s-82.8-2.3-112.3-6.2c-15.4-2-48.7-18.8-73.1-18.8z" />
  </svg>
);

const IconTokenSwap = ({ size = 24, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M21.5 9C21.5 11.7039 19.849 14.0223 17.5 15.0018L17.5 15C17.5 10.3056 13.6944 6.5 9.00001 6.5L8.99817 6.5C9.97773 4.15105 12.2961 2.5 15 2.5C18.5899 2.5 21.5 5.41015 21.5 9ZM7 3C4.79086 3 3 4.79086 3 7V8.5H5V7C5 5.89543 5.89543 5 7 5H8.5V3H7ZM19 15.5V17C19 18.1046 18.1046 19 17 19H15.5V21H17C19.2091 21 21 19.2091 21 17V15.5H19ZM9 21.5C12.5899 21.5 15.5 18.5899 15.5 15C15.5 11.4101 12.5899 8.5 9 8.5C5.41015 8.5 2.5 11.4101 2.5 15C2.5 18.5899 5.41015 21.5 9 21.5ZM9 12.5L11.5 15L9 17.5L6.5 15L9 12.5Z" />
  </svg>
);

const IconMore = ({ size = 24, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
);

const IconSteak = ({ size = 24, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 512 512"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M294.818 43.27c-.957.003-1.917.014-2.88.035-46.15.993-96.56 23.687-128.614 54.82-41.965 40.758-91.926 108.163-118.896 173.047-13.486 32.442-21.17 64.22-19.93 91.305 1.24 27.085 10.723 49.188 32.54 65.546 15.71 11.78 28.638 10.986 44.814 2.72 16.175-8.268 34.067-25.324 52.433-45.405 36.732-40.162 74.766-92.452 121.008-107.932 61.794-20.685 98.278-34.43 120.926-46.785 22.646-12.353 31.392-22.466 40.74-39.08 7.302-12.974 8.365-26.067 5.03-39.882-3.334-13.814-11.388-28.167-22.45-41.62-22.127-26.903-56.253-49.946-83.706-60.003-12.75-4.67-26.652-6.79-41.016-6.764zm3.418 24.26c21.21-.103 42.145 4.338 58.493 16.677 47.554 35.895 86.454 58.96 54.377 111.88-32.076 52.923-177.004 58.17-217.56 20.06-1.663-10.596-12.613-91.45 10.176-121.653 12.52-10.007 54.02-26.77 94.513-26.965zm-119.87 43.66c-1.058 1.99-7.086 83.113-10.403 98.937-19.397 9.728-71.78 21.074-73.92 6.977 3.618-16.654 37.1-71.993 84.324-105.915zm278.095 26.248c1.196 3.294 2.213 6.627 3.026 9.996 4.2 17.4 2.736 35.916-6.84 52.933-10.34 18.374-23.007 32.528-47.808 46.057-24.8 13.53-61.8 27.285-123.832 48.05-36.878 12.346-75.83 61.892-113.438 103.012-18.804 20.56-37.417 39.008-57.525 49.285-5.895 3.014-12.05 5.204-18.322 6.418 3.03 1.73 6.143 3.338 9.165 4.728 8.116 3.734 16.547 5.668 17.197 5.686 14.037-.65 29.08-8.326 44.816-21.024 15.82-12.764 32.063-30.284 48.493-48.676 32.86-36.784 65.744-77.523 104.444-90.478 61.817-20.694 98.67-34.278 121.465-46.543 22.794-12.264 31.4-22.235 40.044-39.028 9.733-18.912 10.244-32.256 4.506-46.28-4.33-10.583-12.968-21.73-25.39-34.135zm-314.546 95.466c33.96-.19 69.09 16.75 104.688 36.092-71.258 37.318-141.89 180.326-187.133 133.99-18.206-20.105-19.433-119.77 30.147-153.564 17.043-11.616 34.51-16.418 52.297-16.518zm-36.463 73.213c-5.436.103-10.92 1.77-14.74 4.787-12.34 9.753-21.72 34.145-11.206 45.844 10.057 11.19 35.46 5.816 44.728-6.012 8.262-10.544 5.69-31.088-4.32-40.02-3.632-3.24-9.023-4.7-14.46-4.6z" />
  </svg>
);

const IconCoins = ({ size = 24, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 512 512"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M512 80c0 18-14.3 34.6-38.4 48c-29.1 16.1-72.5 27.5-122.3 30.9c-3.7-1.8-7.4-3.5-11.3-5C300.6 137.4 248.2 128 192 128c-8.3 0-16.4 .2-24.5 .6l-1.1-.6C142.3 114.6 128 98 128 80c0-44.2 86-80 192-80S512 35.8 512 80zM160.7 161.1c10.2-.7 20.7-1.1 31.3-1.1c62.2 0 117.4 12.3 152.5 31.4C369.3 204.9 384 221.7 384 240c0 4-.7 7.9-2.1 11.7c-4.6 13.2-17 25.3-35 35.5c0 0 0 0 0 0c-.1 .1-.3 .1-.4 .2l0 0 0 0c-.3 .2-.6 .3-.9 .5c-35 19.4-90.8 32-153.6 32c-59.6 0-112.9-11.3-148.2-29.1c-1.9-.9-3.7-1.9-5.5-2.9C14.3 274.6 0 258 0 240c0-34.8 53.4-64.5 128-75.4c10.5-1.5 21.4-2.7 32.7-3.5zM416 240c0-21.9-10.6-39.9-24.1-53.4c28.3-4.4 54.2-11.4 76.2-20.5c16.3-6.8 31.5-15.2 43.9-25.5V176c0 19.3-16.5 37.1-43.8 50.9c-14.6 7.4-32.4 13.7-52.4 18.5c.1-1.8 .2-3.5 .2-5.3zm-32 96c0 18-14.3 34.6-38.4 48c-1.8 1-3.6 1.9-5.5 2.9C304.9 404.7 251.6 416 192 416c-62.8 0-118.6-12.6-153.6-32C14.3 370.6 0 354 0 336V300.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 342.6 135.8 352 192 352s108.6-9.4 148.1-25.9c7.8-3.2 15.3-6.9 22.4-10.9c6.1-3.4 11.8-7.2 17.2-11.2c1.5-1.1 2.9-2.3 4.3-3.4V304v5.7V336zm32 0V304 278.1c19-4.2 36.5-9.5 52.1-16c16.3-6.8 31.5-15.2 43.9-25.5V272c0 10.5-5 21-14.9 30.9c-16.3 16.3-45 29.7-81.3 38.4c.1-1.7 .2-3.5 .2-5.3zM192 448c56.2 0 108.6-9.4 148.1-25.9c16.3-6.8 31.5-15.2 43.9-25.5V432c0 44.2-86 80-192 80S0 476.2 0 432V396.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 438.6 135.8 448 192 448z" />
  </svg>
);

const IconBridge = ({ size = 24, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 576 512"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M32 32C14.3 32 0 46.3 0 64S14.3 96 32 96H72v64H0V288c53 0 96 43 96 96v64c0 17.7 14.3 32 32 32h32c17.7 0 32-14.3 32-32V384c0-53 43-96 96-96s96 43 96 96v64c0 17.7 14.3 32 32 32h32c17.7 0 32-14.3 32-32V384c0-53 43-96 96-96V160H504V96h40c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zM456 96v64H376V96h80zM328 96v64H248V96h80zM200 96v64H120V96h80z" />
  </svg>
);

const IconMrgn = ({ size = 24, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    fill="currentColor"
    viewBox="0 0 75 67"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M40.5038 0C40.5038 11.2992 40.5038 22.0269 40.5038 32.9584C51.9136 32.9584 63.12 32.9584 74.5 32.9584C74.5 44.3768 74.5 55.5915 74.5 67C63.1944 67 51.8342 67 40.1863 67C40.1863 56.153 40.1863 45.1967 40.1863 33.3311C38.2119 34.3348 36.6393 34.8366 35.4338 35.8006C32.1349 38.439 30.3143 42.0961 29.0493 46.0464C27.5611 50.7022 25.9439 55.2139 22.7094 59.0896C19.4651 62.9802 15.4766 65.3553 10.615 66.1354C7.33596 66.6621 3.97255 66.6373 0.5 66.8708C0.5 55.5518 0.5 44.66 0.5 33.6193C1.76996 33.346 3.03 33.1025 4.27516 32.7944C9.21113 31.5671 11.3095 27.5324 13.2244 23.448C15.3079 18.9959 16.8656 14.2755 19.1873 9.96255C22.3026 4.16887 27.6156 1.39128 34.0696 0.710546C36.0738 0.491916 38.0829 0.263349 40.5038 0Z" />
  </svg>
);

export {
  // tabler icons
  IconCaretUpDownFilled,
  IconCheck,
  IconChevronDown,
  IconChevronRight,
  IconBrandX,
  IconBrandApple,
  IconBrandTelegram,
  IconWallet,
  IconSearch,
  IconX,
  IconCopy,
  IconAlertTriangle,
  IconShare2,
  IconArrowDown,
  IconExternalLink,
  IconUserPlus,
  IconBrandDiscordFilled,
  IconClockHour4,

  // customed icons
  IconBrandGoogle,
  IconBraveWallet,
  IconCoinbaseWallet,
  IconPhantomWallet,
  IconSolflareWallet,
  IconBackpackWallet,
  IconWalletConnectWallet,
  IconGlowWallet,
  IconTrustWallet,
  IconLoader,
  IconPieChart,
  IconReceiveMoney,
  IconTokenSwap,
  IconMore,
  IconSteak,
  IconCoins,
  IconBridge,
  IconMrgn,
};
