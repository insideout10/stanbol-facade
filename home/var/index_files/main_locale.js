$(document).ready(function() {
   
    $.getJSON('http://www.105.net/ws-mobile/?action=getProgrammaOnAir&callback=?', function(result) {
        var programma = {};
        programma.id_programma = '';
        programma.slug_programma = '';
        programma.nome_programma = '';
    
    
        $.each(result.onair, function(index, value) {
            programma.id_programma = value.id_programma;
            programma.slug_programma = value.programma_slug;
            programma.nome_programma = value.nome_programma;
        });
       
        $('#title-program').html(programma.nome_programma);
        $('#img-program').attr('src','http://www.105.net/images/onair/' + programma.slug_programma + '.png');      
           
           
    });
	
	/* 

8d1a55ac6e4c87f261d373614f79c9c3
4113576b3d729e36c1f193ae5a06566b
8d1a55ac6e4c87f261d373614f79c9c3
f5438c957d31fd7d34f8442f60a7775e
ea651092fd7c369a1d778ee1ffa434a6
 
f5438c957d31fd7d34f8442f60a7775e
ea651092fd7c369a1d778ee1ffa434a6    
8d1a55ac6e4c87f261d373614f79c9c3
4113576b3d729e36c1f193ae5a06566b
8d1a55ac6e4c87f261d373614f79c9c3

ea651092fd7c369a1d778ee1ffa434a6
e5af5ff1f3a7620431a741558abfffd6
109fcb60ac3b0050c86efc15540c63b5
c2095115e41bf810e7bf64bd21be5023
0616ba3acb269432799f16547b97ba2a
    
*/ 



        $('<iframe id="someId" width="0" height="0" style="display:none;" />').appendTo('#icon');
        $('#someId').attr('src','http://speciali.105.net/static/contents/page.php');

});

  
            
 
