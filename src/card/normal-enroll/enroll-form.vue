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
    <!-- <li>
      <x-input placeholder="身高(cm)" maxlength="3" @blur="checkHeight" v-model="height"></x-input>
      <div class="err">{{heightError}}</div>
    </li>-->
    <li>
      <x-input placeholder="身份证" maxlength="18" @blur="checkIdCard" v-model="idCard"></x-input>
      <div class="err">{{idCardError}}</div>
    </li>
    <li>
      <x-input placeholder="手机号" maxlength="11" @blur="checkPhone" v-model="phone"></x-input>
      <div class="err">{{phoneError}}</div>
    </li>
    <li>
      <x-select v-model="value_term" placeholder="期别">
        <x-option v-for="_ in terms" :label="_.label" :value="_.value" :key="_.value"></x-option>
      </x-select>
      <div class="err">&nbsp;</div>
    </li>
    <li>
      <x-select v-model="value_lesson_am" placeholder="上午课程">
        <x-option v-for="_ in lessonList_am" :label="_.label" :value="_.value" :key="_.value"></x-option>
      </x-select>
      <div class="err">&nbsp;</div>
    </li>
    <li>
      <x-select v-model="value_lesson_pm" placeholder="下午课程">
        <x-option v-for="_ in lessonList_pm" :label="_.label" :value="_.value" :key="_.value"></x-option>
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
      name: "",
      age: "",
      height: "",
      phone: "",
      idCard: "",
      nameError: "",
      ageError: "",
      phoneError: "",
      idCardError: "",
      // selections
      terms: [
        { label: "第一期", value: "1" },
        { label: "第二期", value: "2" },
        { label: "第三期", value: "3" }
      ],
      lessonMap: {
        "1": {
          am: [{ label: "游泳", value: "1" }, { label: "滑冰", value: "2" }],
          pm: [{ label: "棒球", value: "3" }, { label: "网球", value: "4" }]
        },
        "2": {
          am: [{ label: "游泳", value: "1" }, { label: "滑冰", value: "2" }],
          pm: [{ label: "乒乓球", value: "5" }, { label: "网球", value: "4" }]
        },
        "3": {
          am: [{ label: "游泳", value: "1" }, { label: "滑冰", value: "2" }],
          pm: [{ label: "足球", value: "6" }, { label: "网球", value: "4" }]
        }
      },
      // 选中的学期
      value_term: "",
      lessonList_am: [],
      lessonList_pm: [],
      value_lesson_am: "",
      value_lesson_pm: ""
    };
  },
  methods: {
    checkName() {
      this.nameError = validateName(this.name) ? "" : "请输入正确的姓名";
    },
    checkAge() {
      this.ageError = validateAge(this.age) ? "" : "请输入正确的年龄";
    },
    checkHeight() {
      this.heightError = validataHeight(this.height) ? "" : "请输入正确的身高";
    },
    checkPhone() {
      // 是孩子手机号为空，或者手机号校验通过，手机号就不报错
      this.phoneError = validatePhone(this.phone) ? "" : "请输入正确的手机号";
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
      if (err) {
        return { err };
      }

      return {
        name: this.name,
        age: this.age,
        idCard: this.idCard,
        phone: this.phone,
        term: this.term,
        lesson_am: this.lesson_am,
        lesson_pm: this.lesson_pm
      };
    }
  },
  computed: {
    age1() {
      const year = parseInt(this.idCard.substr(6, 4));
      const now = new Date();
      const curYear = now.getFullYear();
      return curYear - year;
    },
    map_terms() {
      return list2Map(this.terms);
    },
    term() {
      return this.map_terms[this.value_term];
    },
    lessonMap_am() {
      return list2Map(this.lessonList_am);
    },
    lessonMap_pm() {
      return list2Map(this.lessonList_pm);
    },
    lesson_am() {
      return this.lessonMap_am[this.value_lesson_am];
    },
    lesson_pm() {
      return this.lessonMap_pm[this.value_lesson_pm];
    }
  },
  watch: {
    value_term(newVal, oldVal) {
      const lessonList = this.lessonMap[newVal];
      this.lessonList_am = lessonList.am;
      this.lessonList_pm = lessonList.pm;
      this.value_lesson_am = this.lessonList_am[0].value;
      this.value_lesson_pm = this.lessonList_pm[0].value;
    }
  },
  created() {
    this.value_term = "1";

    let pJSON = localStorage.getItem("confirm_order.person");
    if (pJSON) {
      const p = JSON.parse(pJSON);
      // input信息
      this.name = p.name;
      this.age = p.age;
      this.idCard = p.idCard;
      this.phone = p.phone;
      // select信息
      this.value_term = p.term && p.term.value;
      this.value_lesson_am = p.lesson_am && p.lesson_am.value;
      this.value_lesson_pm = p.lesson_pm && p.lesson_pm.value;
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


