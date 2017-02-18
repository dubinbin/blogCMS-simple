<template>
    <div class="shade">
        <svg class="spinner"
             viewBox="0 0 66 66"
             xmlns="http://www.w3.org/2000/svg">
            <circle class="path"
                    fill="none"
                    stroke-width="6"
                    stroke-linecap="round"
                    cx="33"
                    cy="33"
                    r="30">
            </circle>
        </svg>
    </div>
</template>
<script>
    export default{}
</script>
<style>
.shade {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 9; }

.spinner {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -25px;
  animation: rotator 1.4s linear infinite; }

@keyframes rotator {
  0% {
    transform: rotate(0deg); }
  100% {
    transform: rotate(270deg); } }
.path {
  stroke-dasharray: 187;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: dash 1.4s ease-in-out infinite, colors 5.6s ease-in-out infinite; }

@keyframes colors {
  0% {
    stroke: #4285F4; }
  25% {
    stroke: #DE3E35; }
  50% {
    stroke: #F7C223; }
  75% {
    stroke: #1B9A59; }
  100% {
    stroke: #4285F4; } }
@keyframes dash {
  0% {
    stroke-dashoffset: 187; }
  50% {
    stroke-dashoffset: 46.75;
    transform: rotate(135deg); }
  100% {
    stroke-dashoffset: 187;
    transform: rotate(450deg); } }

/*# sourceMappingURL=Waiting.css.map */

</style>