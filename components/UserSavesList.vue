
    <template>
  <div class="pt-2 pb-8 px-4">
    <QuestionExcerptGroup
      v-for="(question, Qkey) in userSaves"
      :key="Qkey"
      :question="question"
    />
  </div>
</template>
<script>
import QuestionExcerptGroup from "./QuestionExcerptGroup";
import { mapGetters } from "vuex";

export default {
  components: { QuestionExcerptGroup },

  data: () => ({
    userSaves: [],
    loading: false,
  }),

 async mounted() {
    await  this.getSaves();
  },

  methods: {
     async getSaves() {
      this.loading = true;
      try { 
      await this.$axios.$get("/api/user/" + this.$route.params.id + "/saves")
        .then((resp) => {
          this.userSaves = resp.saves;
          this.loading = false;
        })}
        catch(err){
          console.log(err);
        }
        
      this.loading = false;
    },
  },
};
</script>

