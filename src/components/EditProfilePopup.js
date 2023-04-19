import React, { useContext, useEffect } from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext"
import PopupWithForm from "./PopupWithForm"
import { useFormAndValidation } from "../hooks/useFormAndValidation.js"

function EditProfilePopup({
  isOpen,
  onUpdateUser,
  onLoading,
  onClose,
  onCloseOverlay,
}) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation()
  const currentUser = useContext(CurrentUserContext)

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault()
    if (isValid) {
      // Передаём значения управляемых компонентов во внешний обработчик
      onUpdateUser({
        name: values.name,
        about: values.about,
      })
    }
  }

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser)
    }
  }, [currentUser, resetForm, isOpen])

  return (
    <PopupWithForm
      name="popupEditProfile"
      title="Редактировать профиль"
      buttonText={onLoading ? `Сохранение...` : `Сохранить`}
      onSubmit={handleSubmit}
      onClose={onClose}
      isOpen={isOpen}
      onCloseOverlay={onCloseOverlay}
    >
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_name"
          id="nameInput"
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="nameInput-error error">{errors.name}</span>
      </label>
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_job"
          id="jobInput"
          name="about"
          type="text"
          value={values.about}
          onChange={handleChange}
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="jobInput-error error">{errors.about}</span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup
