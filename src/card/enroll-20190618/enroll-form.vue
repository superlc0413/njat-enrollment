<template>
  <ul class="enroll-form">
    <li>
      <x-input placeholder="家长姓名" maxlength="15" @blur="checkParentName" v-model="parentName"></x-input>
      <div class="err">{{parentNameErr}}</div>
    </li>
    <li>
      <x-input placeholder="家长年龄" maxlength="3" @blur="checkParentAge" v-model="parentAge"></x-input>
      <div class="err">{{parentAgeErr}}</div>
    </li>
    <li>
      <x-input placeholder="家长身份证" maxlength="18" @blur="checkParentIdCard" v-model="parentIdCard"></x-input>
      <div class="err">{{parentIdCardErr}}</div>
    </li>
    <li>
      <x-input placeholder="家长手机号" maxlength="11" @blur="checkParentPhone" v-model="parentPhone"></x-input>
      <div class="err">{{parentPhoneErr}}</div>
    </li>
    <li>
      <x-input placeholder="孩子姓名" maxlength="15" @blur="checkChildName" v-model="childName"></x-input>
      <div class="err">{{childNameErr}}</div>
    </li>
    <li>
      <x-input placeholder="孩子年龄" maxlength="3" @blur="checkChildAge" v-model="childAge"></x-input>
      <div class="err">{{childAgeErr}}</div>
    </li>
    <li>
      <x-input placeholder="孩子身份证" maxlength="18" @blur="checkChildIdCard" v-model="childIdCard"></x-input>
      <div class="err">{{childIdCardErr}}</div>
    </li>
    <li>
      <x-input
        placeholder="孩子手机号"
        maxlength="11"
        :must="false"
        @blur="checkChildPhone"
        v-model="childPhone"
      ></x-input>
      <div class="err">{{childPhoneErr}}</div>
    </li>
  </ul>
</template>

<script>
import {
  validateName,
  validatePhone,
  validateAge,
  validateIdCard,
  validataHeight
} from "@/common/util/validator";

import { list2Map } from "@/common/util/util";

export default {
  props: {},
  data() {
    return {
      must: "必填",
      optional: "选填",
      // inputs
      parentName: "",
      parentAge: "",
      parentIdCard: "",
      parentPhone: "",
      childName: "",
      childAge: "",
      childIdCard: "",
      childPhone: "",
      // errors
      parentNameErr: "",
      childNameErr: "",
      parentAgeErr: "",
      childAgeErr: "",
      parentPhoneErr: "",
      childPhoneErr: "",
      parentIdCardErr: "",
      childIdCardErr: ""
    };
  },
  methods: {
    checkParentName() {
      this.parentNameErr = validateName(this.parentName)
        ? ""
        : "请输入正确的姓名";
    },
    checkChildName() {
      this.childNameErr = validateName(this.childName)
        ? ""
        : "请输入正确的姓名";
    },
    checkParentAge() {
      this.parentAgeErr = validateAge(this.parentAge) ? "" : "请输入正确的年龄";
    },
    checkChildAge() {
      this.childAgeErr = validateAge(this.childAge) ? "" : "请输入正确的年龄";
    },
    // checkHeight() {
    //   this.parentHeightErr = validataHeight(this.parentHeight)
    //     ? ""
    //     : "请输入正确的身高";
    //   this.childHeightErr = validataHeight(this.childHeight)
    //     ? ""
    //     : "请输入正确的身高";
    // },
    checkParentPhone() {
      this.parentPhoneErr = validatePhone(this.parentPhone)
        ? ""
        : "请输入正确的手机号";
    },
    checkChildPhone() {
      // 是孩子手机号为空，或者手机号校验通过，手机号就不报错
      this.childPhoneErr =
        !this.childPhone || validatePhone(this.childPhone)
          ? ""
          : "请输入正确的手机号或不输入手机号";
    },
    checkParentIdCard() {
      this.parentIdCardErr = validateIdCard(this.parentIdCard)
        ? ""
        : "请输入正确的身份证号";
    },
    checkChildIdCard() {
      this.childIdCardErr = validateIdCard(this.childIdCard)
        ? ""
        : "请输入正确的身份证号";
    },
    checkAll() {
      this.checkParentName();
      this.checkParentAge();
      this.checkParentPhone();
      this.checkParentIdCard();
      this.checkChildName();
      this.checkChildAge();
      this.checkChildPhone();
      this.checkChildIdCard();
    },
    getData() {
      this.checkAll();
      const err =
        this.parentNameErr ||
        this.parentAgeErr ||
        this.parentIdCardErr ||
        this.parentPhoneErr ||
        this.childAgeErr ||
        this.childNameErr ||
        this.childIdCardErr ||
        this.childPhoneErr;
      if (err) {
        return { err };
      }

      return {
        parentName: this.parentName,
        parentAge: this.parentAge,
        parentIdCard: this.parentIdCard,
        parentPhone: this.parentPhone,
        childName: this.childName,
        childAge: this.childAge,
        childIdCard: this.childIdCard,
        childPhone: this.childPhone
      };
    },
    setData(family) {
      this.parentName = family.parentName;
      this.parentAge = family.parentAge;
      this.parentIdCard = family.parentIdCard;
      this.parentPhone = family.parentPhone;
      this.childName = family.childName;
      this.childAge = family.childAge;
      this.childIdCard = family.childIdCard;
      this.childPhone = family.childPhone;
    }
  },
  computed: {
    age1() {
      const year = parseInt(this.idCard.substr(6, 4));
      const now = new Date();
      const curYear = now.getFullYear();
      return curYear - year;
    }
  },
  created() {}
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


