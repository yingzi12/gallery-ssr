<script setup>
const form = reactive({
  name: "",
  language: "",
  githubLink: "",
  githubStarsCount: "",
});
const loading = ref(false);
const status = reactive({
  message: "",
  type: "",
});

/**
 * @description Submits new frameworks to the database
 */
async function addNewFramework() {
  const {name, language, githubLink: url, githubStarsCount: stars} = form;

  let message = "";
  if (!name) message += " 'name'";
  if (!language) message += " 'language'";
  if (!url) message += " 'GitHub link'";
  if (!stars) message += " 'stars count'";
  if (message) {
    status.message = "Fill in the:" + message;
    status.type = "success";
    return;
  }

  loading.value = true;

  const {error} = await axios.post("/api/add", {name, language, url, stars}, {
  });
  loading.value = false;

  if (!error.value) {
    status.message = "Thanks for your contribution";
    status.type = "success";
    form.name = "";
    form.language = "";
    form.githubLink = "";
    form.githubStarsCount = 0;
  }
  if (error.value) {
    status.message = error.value.data.message.includes("UNIQUE constraint")
        ? "Framework exists!"
        : error.value.data.message;
    status.type = "error";
  }
  if (status.message)
    setTimeout(() => {
      status.message = "";
      status.type = "";
    }, 5000);
}

useSeoMeta({
  title: "Contribute to the frameworks list",
});
</script>

<template>
  <h1>Submit a framework</h1>

  <div class="px-4 md:px-8 lg:px-12">
    <div
        v-show="status.message"
        id="submission-status-message"
        :class="{
        'text-green-800 bg-green-300': status.type === 'success',
        'text-red-800 bg-red-200': status.type === 'error',
      }"
        class="p-2 px-4"
    >
      {{ status.message }}
    </div>
    <form action="" @submit.prevent="addNewFramework">
      <div>
        <label class="block text-xs font-medium text-gray-700" for="UserEmail">
          Name
        </label>

        <input
            v-model="form.name"
            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
            data-cy="name"
            name="name"
            placeholder="Framework name"
            type="text"
        />
      </div>

      <div>
        <label class="block text-xs font-medium text-gray-700" for="UserEmail">
          Language
        </label>

        <input
            v-model="form.language"
            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
            data-cy="programming-language"
            name="language"
            placeholder="Programming Language"
            type="text"
        />
      </div>

      <div>
        <label class="block text-xs font-medium text-gray-700" for="UserEmail">
          Github
        </label>

        <input
            v-model="form.githubLink"
            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
            data-cy="github-link"
            name="github_link"
            placeholder="GitHub link"
            type="text"
        />
      </div>

      <div>
        <label class="block text-xs font-medium text-gray-700" for="UserEmail">
          Stars count
        </label>

        <input
            v-model="form.githubStarsCount"
            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
            data-cy="github-stars-count"
            name="github_stars_count"
            placeholder="GitHub stars count"
            type="text"
        />
      </div>

      <div class="flex justify-center p-2">
        <button
            class="py-2 px-4 text-white font-semibold bg-blue-600 rounded-md hover:bg-blue-700 focus:relative flex space-x-2 justify-between items-center"
            data-cy="submit"
            title="View Orders"
            type="submit"
        >
          <span>Submit</span>
          <svg
              v-if="loading"
              class="w-4 h-4 animate-spin fill-white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0z" fill="none"/>
            <path
                d="M18.364 5.636L16.95 7.05A7 7 0 1 0 19 12h2a9 9 0 1 1-2.636-6.364z"
            />
          </svg>
        </button>
      </div>
    </form>
  </div>
</template>
