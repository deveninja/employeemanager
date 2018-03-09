<template>
  <div id="edit-employee">
      <h3>Edit Employee <span style="font-size:25px;">- <router-link v-bind:to="{name: 'view-employee', params: {employee_id: employee_id}}">{{name}}</router-link></span> </h3> 
      <div class="row">
        <form @submit.prevent="updateEmployee" class="col s12">
          <div class="row">
            <label for="">Employee ID#</label>
            <div class="input-field col s12">
              <input type="text" v-model="employee_id" disabled>
            </div>
          </div>
          <div class="row">
            <label for="">Full Name</label>
            <div class="input-field col s12">
              <input type="text" v-model="name" required>
            </div>
          </div>
          <div class="row">
            <label for="">Department</label>
            <div class="input-field col s12">
              <input type="text" v-model="dept" required>
            </div>
          </div>
          <div class="row">
            <label for="">Position</label>
            <div class="input-field col s12">
              <input type="text" v-model="position" required>
            </div>
          </div>
          <div class="row">
            <label for="">Skill(s)</label>
            <div class="input-field col s12">
              <input type="text" v-model="skill" required>
              
            </div>
          </div>
          <div class="row">
            <label for="">Contact(s)</label>
            <div class="input-field col s12">
              <input type="text" v-model="contact" required>
              
            </div>
          </div>
          <button class="btn" type="submit">Submit</button>
          <router-link to="/" class="btn grey">Cancel</router-link>
        </form>
      </div>
      <div class="fixed-action-btn">
          <router-link to="/new" class="btn-floating btn-large main-color">
            <i class="fa fa-plus"></i>
          </router-link>
      </div>
  </div>
</template>

<script>
import db from './firebaseInit'
export default {
  name: 'edit-employee',
  data () {
      return {
          employee_id: null,
          name: null,
          dept: null,
          position: null,
          skill: null
      }
  },

  beforeRouteEnter (to, from, next) {
      db.collection('employees').where('employee_id', '==', to.params.employee_id).get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.employee_id = doc.data().employee_id
            vm.name = doc.data().name
            vm.dept = doc.data().dept
            vm.position = doc.data().position
            vm.skill = doc.data().skill
            vm.contact = doc.data().contact
          })
        })
      })
    },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      db.collection('employees').where('employee_id', '==', this.$route.params.employee_id).get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.employee_id = doc.data().employee_id
            this.name = doc.data().name
            this.dept = doc.data().dept
            this.position = doc.data().position
            this.skill = doc.data().skill
            this.contact = doc.data().contact
          })
        })
    },

    updateEmployee () {
     db.collection('employees').where('employee_id', '==', this.$route.params.employee_id).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.update({
            employee_id: this.employee_id,
            name: this.name,
            dept: this.dept,
            position: this.position,
            skill: this.skill,
            contact: this.contact
          })
          .then(() => {
            this.$router.push({name: 'view-employee', params: {employee_id: this.employee_id}})
          })
        })
      }) 
    }

  }
}
</script>
