<template>
  <VCard flat class="pa-4 ">
    <VLayout row wrap>
      <VFlex text-md-center style="position:relative;" xs12>
        <VProgressCircular
          v-if="isUploading"
          class="text-sm-center"
          indeterminate
          style="position:absolute; top:2.5em; left:5em;"
        />
        <VAvatar class="mb-3" size="120px">
          <img :class="{ blur: isUploading }" :src="imgUrl" alt="Avatar" />
        </VAvatar>
      </VFlex>
    </VLayout>
    <VLayout justify-center>
      <VCardActions id="file" class="upload-footer">
        <input id="input-file" class="input-file" type="file" @change="handleImageChange" />
        <label for="input-file" class="v-btn theme--light defualt pa-0 pl-2 pr-3 label-btn">
          <VIcon class="mr-1">{{ icon }}</VIcon>
          <div class="v-btn__content">{{ label }}</div>
        </label>
      </VCardActions>
    </VLayout>
  </VCard>
</template>

<script>
import { ContainerAPI, API_ROOT } from '@/api';

export default {
  name: 'ProfilePictureUpload',
  props: {
    flat: {
      type: Boolean,
      default: false
    },
    preview: {
      type: String,
      default: 'avatar_anonymous.png'
    },
    icon: {
      type: String,
      default: 'cloud_upload'
    },
    label: {
      type: String,
      default: 'Upload Picture'
    }
  },
  data() {
    return {
      isUploading: false,
      uploadComplete: false,
      error: null,
      imagePreviewUrl: null
    };
  },
  computed: {
    imgUrl() {
      if (!this.imagePreviewUrl && !this.preview) {
        return false;
      }
      const img = this.imagePreviewUrl || this.preview;
      return `${API_ROOT}/Containers/users/download/${img}`;
    }
  },
  methods: {
    async handleImageChange(e) {
      e.preventDefault();
      if (!e.target.files || e.target.files.length === 0) {
        return;
      }
      const data = new FormData();
      data.append('file', e.target.files[0]);
      this.isUploading = true;

      try {
        const res = await ContainerAPI.upload('users', data);
        const result = res.data.file[0];
        const { name } = result;
        this.imagePreviewUrl = name;
        this.uploadComplete = true;
        this.error = null;
        const self = this;
        setTimeout(() => {
          self.isUploading = false;
        }, 1000);
        this.$emit('onUploadComplete', name);
      } catch (err) {
        this.uploadComplete = true;
        this.isUploading = false;
        this.error = err;
      }
    }
  }
};
</script>

<style>
.label-btn {
  cursor: pointer;
}
.input-file {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
.loader {
  margin: auto;
  width: 100px;
  top: 60px;
  position: relative;
  left: 20px;
}
.upload-footer {
  text-align: center;
  padding: 5px;
  border-top: 1px solid #ddd;
}
.upload-container {
  min-height: 220px;
  border: 1px solid #d1cfcd;
}
.uploadComponentContainer {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.imageContainerStyle {
  min-height: 200px;
  text-align: center;
  background: #e2e2e2;
}
.blur {
  background: rgb(150, 145, 145);
  opacity: 0.2;
}
</style>
