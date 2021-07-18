<template>
  <div class="container my-3">
    <div class="content" id="error">
			<div class="err-content">
				<h1 th:text="${status}">401</h1>
				<h2>Unauthorized</h2>
        <router-link to="/" type="button" class="btn-err"><font-awesome-icon icon="home" class="me-1" />Back to home page</router-link>
			</div>
		</div>
	</div>
</template>

<script>
export default {

}
</script>

<style scoped>
  * {
    transition: all 0.6s;
  }

  #error {
    font-family: 'Lato', sans-serif;
    color: #888;
    margin: 0;
    display: table;
    width: 100%;
    height: 100vh;
    text-align: center;
  }
  .err-content {
    display: table-cell;
    vertical-align: middle;
  }
  .err-content h1 {
    color: #888;
    font-size: 7rem;
    display: inline-block;
    padding-right: 12px;
    animation: type .5s alternate infinite;
  }
  .btn-err {
    display: inline-block;
    font-weight: 400;
    line-height: 1.5;
    text-decoration: none;
    vertical-align: middle;
    color: #888;
    background-color: #fff;
    border-radius: 0;
    border: 1px solid;
    padding: .375rem .75rem;
  }

  .btn-err:hover {
    color: #fff;
    background-color: #888;
  }

  @keyframes type{
    from{box-shadow: inset -3px 0px 0px #888;}
    to{box-shadow: inset -3px 0px 0px transparent;}
  }
</style>
