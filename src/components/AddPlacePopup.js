import React, { useEffect } from "react"
import PopupWithForm from "./PopupWithForm"
import { useFormAndValidation } from "../hooks/useFormAndValidation.js"

function AddPlacePopup({
  onClose,
  onAddPlace,
  onLoading,
  isOpen,
  onCloseOverlay,
}) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation()

  //сброс значений формы с помощью функции resetForm, когда изменяется значение isOpen
  useEffect(() => {
    resetForm()
  }, [isOpen, resetForm])

  // проверка на валидность формы перед отправкой данных
  function handleSubmit(e) {
    e.preventDefault()
    if (isValid) {
      onAddPlace({
        name: values.name,
        link: values.link,
      })
    }
  }

  return (
    <PopupWithForm
      name="popupNewPlace"
      title="Новое место"
      buttonText={onLoading ? `Сохранение` : `Создать`}
      onSubmit={handleSubmit}
      onClose={onClose}
      isOpen={isOpen}
      onCloseOverlay={onCloseOverlay}
    >
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_image-name"
          id="nameInputNew"
          name="name"
          type="text"
          value={values.name} // валидация
          onChange={handleChange} // валидация
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="nameInputNew-error error">{errors.name}</span>
      </label>
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_image-link"
          id="linkInputNew"
          name="link"
          type="url"
          value={values.link} //валидация
          onChange={handleChange} //валидация
          placeholder="Ссылка на картинку"
          required
        />
        <span className="linkInputNew-error error">{errors.link}</span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup
