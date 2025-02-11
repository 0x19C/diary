import clsx from "clsx"

const ButtonSecondary = ({ label, dense = false, onClick }: Readonly<{ label: string, dense?: boolean; onClick?: () => void }>) => {
  return <button
    className={clsx("duration-300 bg-gray-400 hover:bg-gray-600 py-1 px-3 rounded-md text-white", {
      "text-md": dense,
      "text-xl": !dense,
    })}
    onClick={onClick}
  >
    {label}
  </button>
}
export default ButtonSecondary;