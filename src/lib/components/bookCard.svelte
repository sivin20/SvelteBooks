<script>

    export let book
    export let active

    import {createEventDispatcher} from 'svelte'

    let bookAdded = false

    const dispatch = createEventDispatcher();

    function sayHello() {
        bookAdded = true
        console.log("Book added", bookAdded)
        dispatch('message', {
            text: book
        });
    }

    $: bookAdded
</script>

<main class="list">
    <div class='card flex-row' class:open={active}>
        <img src='{book.image_link}' alt="Book Cover" class='book'>
        <div class='flex-column info'>
            <div class='title overflow'>{book.title}</div>
            <div class='author overflow flex flex-row'>
                <p class="overflow flex-auto">{book.authors}</p>
                <p class="self-end">
                    <strong>Pages:</strong>{book.page_count}
                </p>
            </div>
            <div class='bottom' class:hidden={!active}>
                <p class="summary">{book.description}</p>
                <p class="mt-2"><strong>ISBN_13: </strong>{book.isbn_13}</p>
            </div>
        </div>
        <div class='flex-column group'>
            <div class='members'>
                <button on:click={sayHello} class="primary-button" class:added-button={bookAdded}>Add</button>
            </div>
        </div>
    </div>
</main>

<style lang="scss">

  .group .members .added-button {
    background-color: plum !important;
  }

  .overflow {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  $bg-color:#f6f7f6;
  .flex-row {
    display:flex;
    flex-flow:row;
    align-items:center;
  }
  .flex-column{
    display:flex;
    flex-flow:column;
  }
  .list {
    border-radius:3px;
    & .card {
      cursor:pointer;
      min-width:700px;
      margin-bottom:10px;
      perspective:600px;
      transition:all 0.4s;
      & .bottom {
        height:0;
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
      background-color:lighten($bg-color,8%);
      box-shadow:3px 3px 3px rgba(0,0,0,.2);
      overflow:hidden;
      height:90px;
      border-radius: 10px;
      & .book {
        transition:all 0.5s;
        width:120px;
        box-shadow:0 2px 10px rgba(0,0,0,0.3);
        overflow:hidden;
      }
      & .info {
        transition:all 0.2s;
        width: 400px;
        padding:0 30px;
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
      }
    }
  }
</style>