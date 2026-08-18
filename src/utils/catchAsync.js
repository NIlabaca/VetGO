/**
    Para envolver errores funciones async, eliminando la necesidad de usa 
    try/catch
 */
export const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};