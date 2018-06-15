export const storage = {
    setItem: function(item) {
        localStorage.setItem('store', JSON.stringify(item));
    },

    getItem: function() {
        return JSON.parse(localStorage.getItem('store'));
    }
}