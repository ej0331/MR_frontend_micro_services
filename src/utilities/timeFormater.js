const formatDate = (dateString) => {
    if (!dateString) {
        return ''
    }

    const date = new Date(dateString);

    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')

    return `${year}-${month}-${day}`
}

const formatDateTime = (dateString) => {
    if (!dateString) {
        return ''
    }
    const date = new Date(dateString);

    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')

    return `${year}/${month}/${day} ${hours}:${minutes}`
}

const secondsToMinutes = (seconds) => {
    if (!seconds) {
        return ''
    }
    if (seconds < 60) {
        return `${seconds}秒`
    }
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60

    return `${minutes}分${remainingSeconds.toString().padStart(2, '0')}秒`
}

const ToMinutes = (seconds) => {
    if (!seconds) {
        return ''
    }
    const minutes = seconds / 60
    return `${minutes.toFixed(1)} `
}

export {
    formatDate,
    formatDateTime,
    secondsToMinutes,
    ToMinutes
};