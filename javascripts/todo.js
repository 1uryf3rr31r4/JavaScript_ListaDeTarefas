$(function(){
    var $lastClicked

    function onTarefaDeleteClick(){
        $(this).parent('.tarefa-item')
            .unbind('click')
            .hide('slow',function(){
                $(this).remove()
        })
    }

    function onTarefaItemClick(){
        if(!$(this).is($lastClicked)){
            if($lastClicked !== undefined){
                savePendingEdition($lastClicked)
            }

            $lastClicked = $(this)
            var text = $lastClicked.children('.tarefa-texto').text()
            var content = "<input type='text' "+"class='tarefa-edit' value='"+ text + "'>"
            $lastClicked.html(content)
            $(".tarefa-edit").keydown(onTarefaEditKeydown)
        }
    }

    function onTarefaEditKeydown(event){
        if(event.which === 13){
            savePendingEdition($lastClicked)
            $lastClicked = undefined
        }
    }

    function savePendingEdition($tarefa){
        var text = $tarefa.children('.tarefa-edit').val()
        $tarefa.empty()
        $tarefa.append("<div class='tarefa-texto'>" + text + "</div>")
            .append("<div class='tarefa-delete'></div>")
            .append("<div class='clear'></div>")
        
        $(".tarefa-delete").click(onTarefaDeleteClick)
        $tarefa.click(onTarefaItemClick)
        $(".tarefa-item").click(onTarefaItemClick)
        $("#tarefa").keydown(onTarefaKeydown)
        /*console.log("E aqui vamos salva a nossa tarefa")*/
    }

    function addTarefa(text){
        var $tarefa = $("<div />")
                .addClass("tarefa-item")
                .append($("<div />")
                    .addClass("tarefa-texto")
                    .text(text))
                .append($("<div />")
                    .addClass("tarefa-delete"))
                .append($("<div />")
                    .addClass("clear"))
        
        $("#tarefa-list").append($tarefa)
        $(".tarefa-delete").click(onTarefaDeleteClick)
        $(".tarefa-item").click(onTarefaItemClick)
    }

    function onTarefaKeydown(event){
        if(event.which === 13){
            addTarefa($("#tarefa").val())
            $("#tarefa").val("")
        }
    }

    $(".tarefa-delete").click(onTarefaDeleteClick)
    $(".tarefa-item").click(onTarefaItemClick)
    $("#tarefa").keydown(onTarefaEditKeydown)
})