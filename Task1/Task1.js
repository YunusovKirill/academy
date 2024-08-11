function rate(score) {
    const stars = Math.ceil(score / 20);
    return '★'.repeat(stars) + '☆'.repeat(5 - stars);
}