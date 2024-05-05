interface Props {
  width?: number;
  height?: number;
}

export default function Line({ width = 92, height = 11 }: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 92 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M56.0099 7.78535C57.2383 7.78535 58.2342 6.78951 58.2342 5.56109C58.2342 4.33266 57.2383 3.33682 56.0099 3.33682C54.7815 3.33682 53.7856 4.33266 53.7856 5.56109C53.7856 6.78951 54.7815 7.78535 56.0099 7.78535Z"
        fill="#575757"
        stroke="#575757"
        stroke-width="3.55882"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M34.6583 7.78535C35.8868 7.78535 36.8826 6.78951 36.8826 5.56109C36.8826 4.33266 35.8868 3.33682 34.6583 3.33682C33.4299 3.33682 32.4341 4.33266 32.4341 5.56109C32.4341 6.78951 33.4299 7.78535 34.6583 7.78535Z"
        fill="#575757"
        stroke="#575757"
        stroke-width="3.55882"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <line
        x1="43.3325"
        y1="6.22843"
        x2="48.6708"
        y2="6.22843"
        stroke="#575757"
        stroke-width="1.77941"
      />
      <line
        x1="0.624756"
        y1="6.22843"
        x2="5.96299"
        y2="6.22843"
        stroke="#575757"
        stroke-width="1.77941"
      />
      <line
        x1="11.3013"
        y1="6.22843"
        x2="16.6395"
        y2="6.22843"
        stroke="#575757"
        stroke-width="1.77941"
      />
      <line
        x1="21.9778"
        y1="6.22843"
        x2="27.316"
        y2="6.22843"
        stroke="#575757"
        stroke-width="1.77941"
      />
      <line
        x1="64.6841"
        y1="6.22843"
        x2="70.0223"
        y2="6.22843"
        stroke="#575757"
        stroke-width="1.77941"
      />
      <line
        x1="75.3606"
        y1="6.22843"
        x2="80.6988"
        y2="6.22843"
        stroke="#575757"
        stroke-width="1.77941"
      />
      <line
        x1="86.0371"
        y1="6.22843"
        x2="91.3753"
        y2="6.22843"
        stroke="#575757"
        stroke-width="1.77941"
      />
    </svg>
  );
}
