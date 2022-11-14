// Generate accessible button props
export const createButtonProps = (disabled: boolean) => ({
  role: 'button',
  tabIndex: 0,
  ...(disabled && {
    disabled,
    'aria-disabled': disabled,
  }),
});
