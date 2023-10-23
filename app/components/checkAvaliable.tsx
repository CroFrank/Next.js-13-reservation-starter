"use client"

import { FormEvent, useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Modal } from "./modal"
import { config } from "../constants"

export function CheckAvaliable() {
  const [date, setDate] = useState(null)
  const [data, setData] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const dateObject = new Date(date!)
  const day = String(dateObject.getDate()).padStart(2, "0")
  const month = String(dateObject.getMonth() + 1).padStart(2, "0")
  const year = dateObject.getFullYear()
  const stringDateFormat = `${day}/${month}/${year}`

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setIsSubmitting(true)
      const res = await fetch(`${config.url}/api/search?q=${stringDateFormat}`)
      setIsSubmitting(false)
      const resFromServer = await res.json()
      setData(resFromServer)
      setIsModalOpen(true)
      return
    } catch (err) {
      console.log(err)
      return err
    }
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit}>
        <label htmlFor="datePicker" className="px-2">
          Select a Date:
        </label>
        <DatePicker
          id="datePicker"
          selected={date}
          onChange={(datePick: any) => setDate(datePick)}
          dateFormat="dd/MM/yyyy"
          placeholderText="DD/MM/YYYY"
          required
          autoComplete="off"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out mt-10"
        >
          {isSubmitting ? "Checking..." : "Check avaliability"}
        </button>
      </form>
      <Modal isOpen={isModalOpen} onClose={closeModal} date={date!} data={data}>
        <h2>
          {data ? data : `Unfortunately ${stringDateFormat} is not avaliable.`}
        </h2>
      </Modal>
    </div>
  )
}
