<template>
  <div id="view-employee">
      <ul class="collection with-header">
          <li class="collection-header">
              <h4>{{name}}</h4><span class="sub-title">Profile</span>
              
          </li>
          <span></span>
          <li class="collection-item">Employee ID#: {{employee_id}}</li>
          <li class="collection-item">Department: {{dept}}</li>
          <li class="collection-item">Position: {{position}}</li>
          <li class="collection-item">Skill(s): {{skill}}</li>
          <li class="collection-item">Contact(s): {{contact}}</li>
          
      </ul>
      
      <router-link to="/" class="btn grey"> <i class="fa fa-arrow-left"></i>   Back</router-link>
      <button @click="deleteEmployee" class="btn red"> <i class="fa fa-trash-o"></i> Delete</button>
      <div class="action-btn">
        <div class="fixed-action-btn">
          <router-link v-bind:to="{name: 'edit-employee', params: {employee_id: employee_id}}" class="btn-floating btn-large main-color">
            <i class="fa fa-pencil"></i>
          </router-link>
        </div>
      </div>
 </div>
</template>

<script>
import db from './firebaseInit'
export default {
  name: 'view-employee',
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
    deleteEmployee () {
      if(confirm('Are you sure?')) {
        db.collection('employees').where('employee_id', '==', this.$route.params.employee_id).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
         doc.ref.delete()
         this.$router.push('/')
          })
        })     
      }
    }
  }
}



</script>



