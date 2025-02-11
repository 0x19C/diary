import clsx from "clsx";

const ButtonPrimary: React.FC<{
  label: string | React.ReactNode,
  disabled?: boolean;
  dense?: boolean;
  onClick?: () => void
}> = ({ label, disabled = false, dense = false, onClick }) => {
  return <button
    disabled={disabled}
    className={clsx("duration-300 bg-green-default hover:bg-green-700 py-1 px-3 rounded-md text-white",
      {
        "text-md": dense,
        "text-xl": !dense,
        '!bg-gray-500 hover:!bg-gray-500': disabled
      }
    )}
    onClick={onClick}
  >
    {label}
  </button>
}
export default ButtonPrimary;