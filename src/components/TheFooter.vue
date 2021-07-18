<template>
  <div class="container-fluid py-5 pt-5 text-center footer-bg">
    <div class="row">
    <div class="col-12 col-md-4">
      <div class="footer-title fs-3 fw-bold">
        <i class="fas fa-user-circle d-inline"></i>
        <span class="text-uppercase" th:text="#{label.page.aboutme}">About me</span>
      </div>

      <ul class="list-unstyled text-small">
        <li><a class="link-light" href="https://www.szikorazoltan.hu" target="_blank">Szikora Zoltán</a></li>
      </ul>
    </div>

    <div class="col-12 col-md-4">
      <div class="footer-title fs-3 fw-bold">
        <i class="far fa-id-card d-inline"></i>
        <span class="text-uppercase" th:text="#{label.page.contact}">Contact</span>
      </div>
      <ul class="list-unstyled text-small">
        <li class="text-light"><font-awesome-icon icon="mobile" class="me-1" />30/4175075</li>
        <li class="text-light"><font-awesome-icon icon="envelope" class="me-1" />info@szikorazoltan.hu</li>
        <li class="text-light"><font-awesome-icon icon="map-marker-alt" class="me-1" />4031 Debrecen</li>
      </ul>
    </div>

    <div class="col-12 col-md-4">
      <div class="footer-title fs-3 fw-bold">
        <i class="fas fa-mouse-pointer d-inline"></i>
        <span class="text-uppercase" th:text="#{label.page.usefulLinks}">Useful Links</span>
      </div>
      <ul class="list-unstyled text-small">
        <li><a class="link-light" href="https://www.baeldung.com/" target="_blank">Baeldung</a></li>
        <li><a class="link-light" href="https://stackoverflow.com/" target="_blank">Stack Overflow</a></li>
        <li><a class="link-light" href="https://www.udemy.com" target="_blank">Udemy</a></li>
      </ul>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>

<style scoped>
  .footer-bg{
    background-color: #35495e;
  }
  .footer-title{
    color: var(--bs-teal);
  }
</style>
