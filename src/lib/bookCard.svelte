<script>
    export let book
    export let active
</script>

<main class="list">
    <div class='card flex-row' class:open={active}>
        <img src='{book.imageLinks?.thumbnail}' alt="Book Cover" class='book'>
        <div class='flex-column info'>
            <div class='title overflow'>{book.title}</div>
            <div class='author overflow'>{book.authors}</div>
            <div class='hidden bottom summary'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod ratione impedit temporibus maiores autem aperiam assumenda exercitationem, quisquam nobis esse.
            </div>
        </div>
        <div class='flex-column group'>
            <div class='members'>
                <button class="primary-button">Add</button>
            </div>
        </div>
    </div>
</main>

<style lang="scss">

  .overflow {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  $bg-color:#f6f7f6;
  body {
    background-color: $bg-color;
  }
  .flex-row {
    display:flex;
    flex-flow:row;
    align-items:center;
  }
  .flex-column{
    display:flex;
    flex-flow:column;
  }
  .center {
    align-items:center;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
  }
  .list {
    border-radius:3px;
    & .card {
      cursor:pointer;
      min-width:700px;
      margin-bottom:10px;
      perspective:600px;
      transition:all 0.1s;
      & .bottom {
        height:0px;
        overflow:hidden;
        width:200px;
        font-size:12px;
        color:#777;
        font-weight:normal;
      }
      &.open {
        padding:30px;
        height:auto;
        & .bottom {
          margin-top:10px;
          height:100%;
          overflow:visible;
        }
        & .book {
          transform:rotateY( 50deg );
          box-shadow:-10px 10px 10px 2px rgba(0,0,0,.2), -2px 0px 0px 0px #888;
          transition:all 0.5s;
          transition-delay:0.05s;
        }
        & .info {
          transform:translate(0,-10px);
        }
        & .members {
          padding:15px 20px;
          border-radius:4px;
          align-self:flex-start;
        }
      }
      & button.simple {
        cursor:pointer;
        color:#CCC;
        border:none;
        outline:none;
        border-radius:4px;
        background-color:#1ea94b;
        padding:15px 20px;
        font-family:'Montserrat';
        font-weight:bold;
        transition:all 0.1s;
        &:hover {
          box-shadow:0px 15px 20px -5px rgba(0,0,0,.3);
          transform:translate(0,-2px);
        }
      }
      background-color:lighten($bg-color,8%);
      box-shadow:3px 3px 3px rgba(0,0,0,.2);
      overflow:hidden;
      height:90px;
      border-radius: 10px;
      & .book {
        transition:all 0.5s;
        width:120px;
        box-shadow:0px 2px 10px rgba(0,0,0,0.3);
        overflow:hidden;
      }
      & .info {
        transition:all 0.2s;
        min-width:200px;
        max-width: 400px;
        padding:0px 30px;
        font-family:'Montserrat';
        font-weight:bold;
        & .title {
          font-size:1em;
          color:#000;
          letter-spacing:1px;
        }
        & .author {
          font-size:12px;
          font-weight:normal;
          color:#888;
        }
      }
      & .group {
        margin-left:auto;
      }
      & .members {

        transition:all 0.1s;
        padding:40px;
        font-family:'Montserrat';
        color:#CCC;
        background-color:lighten($bg-color,5%);
        & .current {
          font-weight:bold;
          margin-right:10px;
        }
        & .max {
          opacity:0.5;
          margin-left:10px;
        }
      }
    }
  }
</style>