export function formatDate(date: Date) {

    //Intl => lib de internacionalização
    const formattDate = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })

    return formattDate.format(date);
}