$(document).ready(function(){
    try {
        if(localStorage.getItem('loggedin-user')){
            const user = JSON.parse(localStorage.getItem('loggedin-user'))
            $(".nav-account").html('Log Out')
            $(".nav-account").click(function(e){
                e.preventDefault()
                localStorage.removeItem('loggedin-user')
                location.reload()
            })
        }        
    } catch (error) {
        
    }
})