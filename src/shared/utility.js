export const getUniqueId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
}

export const getRandomColor = () => {
    const letters = '0123456789abcdef';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export const getRelativePointerPosition = (node) => {
    const transform = node.getAbsoluteTransform().copy()
    transform.invert()
    const pos = node.getStage().getPointerPosition()
    return transform.point(pos)
}