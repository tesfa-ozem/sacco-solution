import { Component, Vue } from "vue-property-decorator"
@Component
class ProjectMixin extends Vue {
  public projName = "";
  public val  ="";
  formatPrice(value:any) {
    this.val = (value / 1).toFixed(2).replace(",", ".");
    return this.val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
export default ProjectMixin