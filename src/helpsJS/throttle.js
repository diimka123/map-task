export default function throttle(func, ms) {

   let isThrottled = false;
   let savedArgs;

   function wrapper() {

      if (isThrottled) {
         savedArgs = arguments;
         return;
      }

      func.apply(null, arguments);

      isThrottled = true;

      setTimeout(() => {
         isThrottled = false;
         if (savedArgs) {
            wrapper.apply(null, savedArgs);
            savedArgs = null;
         }
      }, ms);
   }

   return wrapper;
}