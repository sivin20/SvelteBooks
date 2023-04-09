<script>
    export let book
    export let active

    import {createEventDispatcher} from 'svelte'

    const dispatch = createEventDispatcher();

    function sayHello() {
        dispatch('message', {
            text: book
        });
    }
</script>

<main class="list">
    <div class='card flex-row' class:open={active}>
        <img src='{book.imageLinks?.thumbnail}' alt="Book Cover" class='book'>
        <div class='flex-column info'>
            <div class='title overflow'>{book.title}</div>
            <div class='author overflow flex flex-row'>
                <p class="overflow flex-auto">{book.authors}</p>
                <p class="self-end">
                    <strong>Pages:</strong>{book.pageCount}
                </p>
            </div>
            <div class='bottom' class:hidden={!active}>
                <p class="summary">{book.description}</p>
                <p class="mt-2"><strong>ISBN_13: </strong>{book.industryIdentifiers[1].identifier}</p>
            </div>
        </div>
        <div class='flex-column group'>
            <div class='members'>
                <button on:click={sayHello} class="primary-button">Add</button>
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
        width:350px;
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
        width: 400px;
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
        & .summary {
          overflow: hidden;
          -webkit-line-clamp: 3;
          text-overflow: ellipsis;
          max-height: 60px;

          display: -webkit-box;
          -webkit-box-orient: vertical;
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