<template>
    <div class="container">
        <form class="user-form" @submit.prevent="onSubmit">
            <div class="user-form__inner">
                <div class="user-form__group">
                    <div class="user-form__list">
                        <div class="row">
                            <div class="form-group col col--6 col-dk--12" :class="{ 'form-group--error': $v.surname.$error }">
                                <label for="userSurname" class="form-group__label">Фамилия*</label>
                                <input id="userSurname" class="form-group__input input" placeholder="Иванов" v-model.trim="$v.surname.$model"/>
                                <span class="form-group__error" v-if="$v.surname.$dirty &&! $v.surname.required">Фамилия обязательна</span>
                            </div>
                            <div class="form-group col col--6 col-dk--12" :class="{ 'form-group--error': $v.name.$error }">
                                <label for="userName" class="form-group__label">Имя*</label>
                                <input id="userName" class="form-group__input input" placeholder="Иван" v-model.trim="$v.name.$model"/>
                                <span class="form-group__error" v-if="$v.name.$dirty && !$v.name.required">Имя обязательно</span>
                            </div>
                            <div class="form-group col col--6 col-dk--12">
                                <label for="userPatronymic" class="form-group__label">Отчество</label>
                                <input id="userPatronymic" class="form-group__input input" placeholder="Иванович" v-model.trim='patronymic'/>
                            </div>
                            <div class="form-group col col--6 col-dk--12" :class="{ 'form-group--error': $v.unmaskedBirthday.$error }">
                                <label for="userBirthday" class="form-group__label">Дата рождения*</label>
                                <input id="userBirthday" class="form-group__input input" v-custom-mask:unmaskedBirthday="'##/##/####'" placeholder="21/09/1995" v-model.trim='birthday'/>
                                <span class="form-group__error" v-if="$v.unmaskedBirthday.$dirty && !$v.unmaskedBirthday.required">Дата рождения обязательна</span>
                                <span class="form-group__error" v-if="$v.unmaskedBirthday.$dirty && !$v.unmaskedBirthday.minLength">Минимум 8 цифр</span>
                            </div>
                            <div class="form-group col col--6 col-dk--12">
                                <label for="userPhone" class="form-group__label">Номер телефона*</label>
                                <phoneInput id="userPhone" ref="userPhone" class="form-group__input" @input="phoneLength = phone.length" v-model:value="$v.phone.$model"></phoneInput>
                                <span class="form-group__error" v-if="$v.phone.unmasked.$dirty && !$v.phone.unmasked.required">Телефон обязателен</span>
                                <span class="form-group__error" v-if="$v.phone.unmasked.$dirty && !$v.phone.unmasked.minLength">Минимум {{ phoneLength }} цифр</span>
                            </div>
                            <div class="form-group col col--6 col-dk--12">
                                <label for="userGender" class="form-group__label">Пол</label>
                                <custom-selector class="form-group__select"
                                        id="userGender"
                                        v-model="gender"
                                        :options="genderOptions">
                                </custom-selector>
                            </div>
                            <div class="form-group col col--6 col-dk--12">
                                <label for="userClientGroup" class="form-group__label">Группа клиентов*</label>
                                <custom-selector class="form-group__select"
                                                 id="userClientGroup"
                                                 v-model="group"
                                                 :options="groupOptions"
                                                 :multiple="true">
                                </custom-selector>
                            </div>
                            <div class="form-group col col--6 col-dk--12">
                                <label for="userActiveDoctor" class="form-group__label">Лечащий врач</label>
                                <custom-selector class="form-group__select"
                                        id="userActiveDoctor"
                                        v-model="doctor"
                                        :options="doctorOptions">
                                </custom-selector>
                            </div>
                            <div class="form-group col col--6 col-dk--12">
                                <div class="checkbox">
                                    <input id="userSendSMS" type="checkbox" class="checkbox__input" v-model="sendSms">
                                    <span class="checkbox__pic"></span>
                                    <label for="userSendSMS" class="checkbox__label">Не отправлять СМС</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button type="submit" class="btn btn--primary user-form__btn">Создать клиента</button>
        </form>
    </div>
</template>

<style src="./userForm.sass" lang="sass"></style>
<script src="./userForm.js"></script>
