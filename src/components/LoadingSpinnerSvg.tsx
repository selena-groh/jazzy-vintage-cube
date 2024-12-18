function LoadingSpinnerSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      width="100%"
      height="100%"
      style={{
        shapeRendering: "auto",
        display: "block",
        background: "transparent",
      }}
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g>
        <g transform="rotate(0 50 50)">
          <rect
            fill="#d9c89a"
            height={20}
            width={20}
            ry={10}
            rx={10}
            y={1}
            x={40}
          >
            <animate
              repeatCount="indefinite"
              begin="-0.9756097560975608s"
              dur="1.2195121951219512s"
              keyTimes="0;1"
              values="1;0"
              attributeName="opacity"
            />
          </rect>
        </g>
        <g transform="rotate(72 50 50)">
          <rect
            fill="#4c9ac0"
            height={20}
            width={20}
            ry={10}
            rx={10}
            y={1}
            x={40}
          >
            <animate
              repeatCount="indefinite"
              begin="-0.7317073170731706s"
              dur="1.2195121951219512s"
              keyTimes="0;1"
              values="1;0"
              attributeName="opacity"
            />
          </rect>
        </g>
        <g transform="rotate(144 50 50)">
          <rect
            fill="#2b241c"
            height={20}
            width={20}
            ry={10}
            rx={10}
            y={1}
            x={40}
          >
            <animate
              repeatCount="indefinite"
              begin="-0.4878048780487804s"
              dur="1.2195121951219512s"
              keyTimes="0;1"
              values="1;0"
              attributeName="opacity"
            />
          </rect>
        </g>
        <g transform="rotate(216 50 50)">
          <rect
            fill="#b1331c"
            height={20}
            width={20}
            ry={10}
            rx={10}
            y={1}
            x={40}
          >
            <animate
              repeatCount="indefinite"
              begin="-0.2439024390243902s"
              dur="1.2195121951219512s"
              keyTimes="0;1"
              values="1;0"
              attributeName="opacity"
            />
          </rect>
        </g>
        <g transform="rotate(288 50 50)">
          <rect
            fill="#6a9760"
            height={20}
            width={20}
            ry={10}
            rx={10}
            y={1}
            x={40}
          >
            <animate
              repeatCount="indefinite"
              begin="0s"
              dur="1.2195121951219512s"
              keyTimes="0;1"
              values="1;0"
              attributeName="opacity"
            />
          </rect>
        </g>
        <g />
      </g>
      {/* [ldio] generated by https://loading.io */}
    </svg>
  );
}

export default LoadingSpinnerSvg;
