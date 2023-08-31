

<script lang="ts">
    const authorizedExtensions = ['.jpg', '.jpeg', '.png'];
</script>

<form action="?/avatar" method="post" enctype="multipart/form-data">
    <input accept="{authorizedExtensions.join(',')}" type="file" name="avatar" placeholder="avatar" />
    <button type="submit">upload</button>
</form>