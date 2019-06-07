<template>
  <ul class="enroll-form">
    <li>
      <x-input placeholder="姓名" maxlength="15" @blur="checkName" v-model="name"></x-input>
      <div class="err">{{nameError}}</div>
    </li>
    <li>
      <x-input placeholder="年龄" maxlength="3" @blur="checkAge" v-model="age"></x-input>
      <div class="err">{{ageError}}</div>
    </li>
    <li>
      <x-input placeholder="手机号" maxlength="11" @blur="checkPhone" :must="!isChild" v-model="phone"></x-input>
      <div class="err">{{phoneError}}</div>
    </li>
    <li>
      <x-input placeholder="身份证" maxlength="18" @blur="checkIdCard" v-model="idCard"></x-input>
      <div class="err">{{idCardError}}</div>
    </li>
    <li :class="{invisible: noSex != undefined}">
      <x-select v-model="sex" placeholder="性别">
        <x-option v-for="_ in sexList" :label="_.text" :value="_.value" :key="_.value"></x-option>
      </x-select>
      <div class="err">&nbsp;</div>
    </li>
    <li :class="{invisible: !groupList.length}">
      <x-select v-model="group" placeholder="组别">
        <x-option v-for="_ in groupList" :label="_.text" :value="_.value" :key="_.value"></x-option>
      </x-select>
      <div class="err">&nbsp;</div>
    </li>
  </ul>
</template>

<script>
import {
  validateName,
  validatePhone,
  validateAge,
  validateIdCard
} from "@/common/unique/validator";

export default {
  props: {
    isChild: {
      type: Boolean,
      default: false
    },
    groupList: {
      type: Array,
      default: () => []
    },
    noSex: {}
  },
  data() {
    return {
      must: "必填",
      optional: "选填",
      name: "",
      age: "",
      phone: "",
      idCard: "",
      sex: "1",
      sexList: [{ value: "1", text: "男" }, { value: "2", text: "女" }],
      group: "A",
      nameError: "",
      ageError: "",
      phoneError: "",
      idCardError: ""
    };
  },
  methods: {
    checkName() {
      this.nameError = validateName(this.name) ? "" : "请输入正确的姓名";
    },
    checkAge() {
      this.ageError = validateAge(this.age) ? "" : "请输入正确的年龄";
    },
    checkPhone() {
      // 是孩子手机号为空，或者手机号校验通过，手机号就不报错
      this.phoneError =
        validatePhone(this.phone) || (this.isChild && this.phone === "")
          ? ""
          : "请输入正确的手机号";
    },
    checkIdCard() {
      this.idCardError = validateIdCard(this.idCard)
        ? ""
        : "请输入正确的身份证号";
    },
    getData() {
      this.checkName();
      this.checkAge();
      this.checkPhone();
      this.checkIdCard();
      const err =
        this.nameError || this.ageError || this.phoneError || this.idCardError;
      const data = {
        name: this.name,
        age: this.age,
        phone: this.phone,
        idCard: this.idCard,
        sex: this.sex,
        group: this.group
      };
      if (err) return { err };
      else return data;
    }
  }
};
</script>

<style lang="scss">
@mixin lineHeight($h) {
  height: $h;
  line-height: $h;
}
.enroll-form {
  width: 320px;
  margin: 0 auto;
  li {
    margin-top: 0.18rem;
    &:first-child {
      margin-top: 0;
    }
    .err {
      @include lineHeight(22px);
      color: rgba(255, 255, 255, 0.8);
      font-size: 12px;
      padding-left: 63px;
    }
    &.invisible {
      visibility: hidden;
    }
  }
}
</style>


