/*
 * @Author       : Senkita
 * @Date         : 2024-04-28 16:12:57
 * @Description  : 全局状态管理
 * @LastEditTime : 2024-04-28 22:35:00
 * @LastEditors  : Senkita
 */
const useStateParked = () => useState<number>("StateParked", () => 0);

export { useStateParked };
