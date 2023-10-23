interface InputProps {
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function Input({ name, value, onChange }: InputProps) {
  console.log(onChange)
  return (
    <div className="mb-4">
      <label htmlFor="name">{name.toUpperCase()}:</label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />
    </div>
  )
}
