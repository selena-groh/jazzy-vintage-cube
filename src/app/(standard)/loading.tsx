import "server-only";
import LoadingSpinnerSvg from "@/components/LoadingSpinnerSvg";

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "60vw",
      }}
    >
      <div style={{ width: "100px" }}>
        <LoadingSpinnerSvg />
      </div>
      <h2>Beginning upkeep step...</h2>
    </div>
  );
}
