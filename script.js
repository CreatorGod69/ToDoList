$(function() {
    const $tasksList = $("#tasksList"),
     $tasksInput = $("#taskInput"),
     $notification = $("#notification");

    let words,
     btnsDelete;

    localStorage.length < 1 ? words = [] : words = jQuery.parseJSON(localStorage.getItem('words'));

    let displayNotification = () => {
        if(!$tasksList.children().length) {
            $notification.fadeIn("fast");
        } else {
            $notification.css("display", "none");
        }
    }

    function СreateWord (word) {
        this.word = word;
    }

    const addWords = (index) => {
        $tasksList.append(`<li>${words[index].word}<button class='delete'>&#10006</button></li>`);
    }

    words.forEach((element, i) => {
        addWords(i);
    })

    $("#taskAdd").on("click", function () {
        if(!$tasksInput.val()) {return false;}

        words.push(new СreateWord($tasksInput.val()));
        localStorage.setItem('words', JSON.stringify(words));

        addWords(words.length -1);

        displayNotification();

        $tasksInput.val("");

    addEventDelete();

    });

    deleteWord = (e) => {
        const rowIndex = e.target.parentNode.rowIndex;
        e.target.parentNode.remove();
        words.splice(rowIndex, 1);
        localStorage.removeItem('words');
        localStorage.setItem('words', JSON.stringify(words));
    }

    addEventDelete = () => {
        if(words.length > 0) {
            btnsDelete = $(".delete");
            for(let btn of btnsDelete) {
                btn.addEventListener('click', e => {
                    const $parent = btnsDelete.parent();
                    $parent.css("animation", "fadeOut .3s linear");

                    setTimeout(function() {
                        deleteWord(e);
                        displayNotification();
                    }, 295)
                })
            }
        }
    }

})

