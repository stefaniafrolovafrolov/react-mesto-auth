import React, { useRef, useEffect } from "react"
import PopupWithForm from "./PopupWithForm"
import { useFormAndValidation } from "../hooks/useFormAndValidation.js"

function EditAvatarPopup({
  onLoading,
  onClose,
  onUpdateAvatar,
  isOpen,
  onCloseOverlay,
}) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation()

  const avatarRef = useRef(null)

  useEffect(() => {
    avatarRef.current.value = ""
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault()
    if (isValid) {
      resetForm() // вызов resetForm перед отправкой данных
      onUpdateAvatar({
        avatar: avatarRef.current.value, // получение значения инпута через реф
      })
    }
  }

  return (
    <PopupWithForm
      name="popupEditAvatar"
      title="Обновить аватар"
      buttonText={onLoading ? `Сохранение...` : `Сохранить`}
      onSubmit={handleSubmit}
      onClose={onClose}
      isOpen={isOpen}
      onCloseOverlay={onCloseOverlay}
    >
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_link-avatar"
          id="nameInputAvatar"
          name="avatar"
          type="url"
          ref={avatarRef} // передача рефа в инпут
          value={values.avatar} // добавить значение из useFormAndValidation
          onChange={handleChange} // добавить обработчик изменений
          placeholder="Введите ссылку URL"
          required
        />
        <span className="nameInputAvatar-error error">{errors.avatar}</span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup
