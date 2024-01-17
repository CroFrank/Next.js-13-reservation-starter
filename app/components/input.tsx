interface InputProps {
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type: string
}

export function Input({ name, value, onChange, type }: InputProps) {
  return (
    <div className="mb-4">
      <label htmlFor="name">{name.toUpperCase()}:</label>
      <input
        type={type}
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
