import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

const LoadingOverlay = ({
  isOpen,
  background = "black",
  position = "fixed",
}: Readonly<{
  position?: "fixed" | "absolute";
  background?: "black" | "white";
  isOpen: boolean;
}>) => {
  if (!isOpen) return null;
  return (
    <div
      className={clsx(
        "top-0 left-0 right-0 bottom-0 backdrop-blur-[2px] z-[11]",
        { fixed: position === "fixed" },
        { absolute: position === "absolute" }
      )}
    >
      <div
        className={clsx(
          "relative h-full w-full flex items-center justify-center",
          {
            "bg-[#00000066]": background === "black",
          },
          {
            "bg-[#ffffff66]": background === "white",
          }
        )}
      >
        <FontAwesomeIcon
          icon={faSpinner}
          className={clsx(
            "text-4xl",
            {
              "text-white": background === "black",
            },
            {
              "text-green-default": background === "white",
            }
          )}
          spin
        />
      </div>
    </div>
  );
};

export default LoadingOverlay;
