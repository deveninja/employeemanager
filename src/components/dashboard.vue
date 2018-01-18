<template>
  <div id="dashboard">
      <ul class="collection with-header">
          <li class="collection-header">
              <h4>Employees</h4>
              <span class="sub-title">Click the name or the user icon to view employee</span>
          </li>
          <li v-for="employee in employees" v-bind:key="employee.id" class="collection-item">
            
            <span>
            <router-link v-bind:to="{name: 'view-employee', params: {employee_id: employee.employee_id}}">{{employee.name}}</router-link>
            </span>

            <router-link class="secondary-content" v-bind:to="{name: 'view-employee', params: {employee_id: employee.employee_id}}">
                <i class="fa fa-user" style="color:#4CAF50"> View Profile</i>
            </router-link>
          </li>
      </ul>
      <div class="fixed-action-btn">
          <router-link to="/new" class="btn-floating btn-large green">
            <i class="fa fa-plus"></i>
          </router-link>
      </div>
 </div>
</template>

<script>
import db from './firebaseInit'
export default {
  name: 'dashboard',
  data () {
      return {
          employees: []
      }
  },
  created () {
      db.collection('employees').orderBy('name').get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
              
              const data = {
                  'id' : doc.id,
                  'employee_id' : doc.data().employee_id,
                  'name' : doc.data().name,
                  'dept': doc.data().dept,
                  'position' : doc.data().position
              }
              this.employees.push(data)
          })
      })
  }
}
</script>
