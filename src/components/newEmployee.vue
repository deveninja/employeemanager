<template>
  <div id="new-employee">
      <h3>New Employee</h3>
      <div class="row">
        <form @submit.prevent="saveEmployee" class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <input type="text" v-model="employee_id" required>
              <label for="">Employee ID#</label>
            </div>
          </div>
        </form>
      </div>
  </div>
</template>

<script>
export default {
  name: 'new-employee',
  data () {
      return {
          
      }
  }
}
</script>
