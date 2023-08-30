

<script lang="ts">
    const authorizedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
</script>

<form action="?/avatar" method="post" enctype="multipart/form-data">
    <input type="file" name="avatar" placeholder="avatar" />
    <button type="submit">upload</button>
</form>