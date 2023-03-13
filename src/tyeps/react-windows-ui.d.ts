declare module 'react-windows-ui' {
  // NavBar
  interface NavBarProps {
    title?: string;
    shadowOnScroll?: boolean;
    collapsed?: boolean;
    titleBarMobile?: React.ReactNode;
    goBack?: () => void;
    children?: React.ReactNode;
  }
  declare const NavBar: React.FC<NavBarProps>

  // NavBarLink
  interface NavBarLinkProps {
    showBadge?: number | string;
    imgSrc?: string | any;
    text?: string;
    exact?: boolean;
    to?: string;
    icon?: React.ReactNode | any;
    badgeBackgroundColor?: string | any;
  }
  declare const NavBarLink: React.FC<NavBarLinkProps>

  // NavBarSubMenu
  interface NavBarSubMenuProps {
    title?: string;
    children?: React.ReactNode;
  }
  declare const NavBarSubMenu: React.FC<NavBarSubMenuProps>

  // NavBarSearchBox
  interface NavBarSearchBoxProps {
    placeholder?: string;
    onChange?: () => void;
  }
  declare const NavBarSearchBox: React.FC<NavBarSearchBoxProps>

  // NavPageContainer
  interface NavPageContainerProps {
    animateTransition?: boolean;
    hasPadding?: boolean;
    overscroll?: boolean;
    children?: React.ReactNode;
  }
  declare const NavPageContainer: React.FC<NavPageContainerProps>

  // NavBarThemeSwitch
  interface NavBarThemeSwitchProps {
    //no props
  }
  declare const NavBarThemeSwitch: React.FC<NavBarThemeSwitchProps>

  // NavBarSearchSuggestion
  interface NavBarSearchSuggestionProps {
    placeholder?: string;
    tooltip?: string;
    data?: string[];
  }
  declare const NavBarSearchSuggestion: React.FC<NavBarSearchSuggestionProps>

  // Accordion
  interface AccordionProps {
    headerTitle?: string;
    children?: React.ReactNode;
  }
  declare const Accordion: React.FC<AccordionProps>

  // AppTheme
  interface AppThemeProps {
    color?: any;
    colorDarkMode?: any;
    scheme?: "light" | "dark" | "system";
    onColorChange?: () => void;
    onSchemeChange?: () => void;
  }
  declare const AppTheme: React.FC<AppThemeProps>

  // AvatarView
  interface AvatarViewProps {
    size?: any;
    alt?: string;
    src?: React.ReactNode;
    tooltip?: string;
    objectFit?: string;
    showBadge?: boolean | any;
    badgePosition?: "bottom" | "top";
    badgeBackgroundColor?: any;
    badgeTooltip?: string;
    badgeStyle?: any;

    showBackdropShadow?: boolean;
    onLoad?: () => void;
    onError?: () => void;
  }
  declare const AvatarView: React.FC<AvatarViewProps>

  // Alert
  interface AlertProps {
    isVisible?: boolean;
    title?: string;
    message?: string;
    children?: React.ReactNode;
    onBackdropPress?: () => void;
  }
  declare const Alert: React.FC<AlertProps> & { Footer: any }

  // Button
  interface ButtonProps {
    width?: number | string;
    value?: string;
    disabled?: boolean;
    tooltip?: string;
    isLoading?: boolean;
    icon?: React.ReactNode;
    textAlign?: string;
    type?: "default" | "primary" | "primary-outline" | "success" | "success-outline" | "danger" | "danger-outline";
    onSubmit?: any;
    onClick?: any;
    onDoubleClick?: any;
    style?: CSSProperties;
  }
  declare const Button: React.FC<ButtonProps>

  // ButtonIcon
  interface ButtonIconProps {
    width?: number | string;
    height?: number | string;
    tooltip?: string;
    iconSize?: number | string;
    disabled?: boolean;
    icon?: React.ReactNode;
    onClick?: Function
  }
  declare const ButtonIcon: React.FC<ButtonIconProps>

  // Checkbox
  interface CheckboxProps {
    label?: string;
    disabled?: boolean;
    defaultChecked?: boolean;
    tooltip?: string;
    onChange?: Function;
    name?: any;
    value?: any;
  }
  declare const Checkbox: React.FC<CheckboxProps>

  // CommandBar
  interface CommandBarProps {
    backgroundColor?: string;
    children?: React.ReactNode;
  }
  declare const CommandBar: React.FC<CommandBarProps>

  // ColorPickerItem
  interface ColorPickerItemProps {
    name?: string;
    defaultChecked?: boolean;
    disabled?: boolean;
    width?: number | string;
    height?: number | string;
    color?: string;
    onChange?: Function;
  }
  declare const ColorPickerItem: React.FC<ColorPickerItemProps>

  // ColorPickerPalette
  interface ColorPickerPaletteProps {
    disabled?: boolean;
    width?: number | string;
    height?: number | string;
    color?: any;
    onChange?: Function;
  }
  declare const ColorPickerPalette: React.FC<ColorPickerPaletteProps>

  // Dialog
  interface DialogProps {
    isVisible?: boolean;
    children?: React.ReactNode;
    onBackdropPress?: () => void;
    style?: CSSProperties
  }
  declare const Dialog: React.FC<DialogProps> & { Body: any }

  // ImageView
  interface ImageViewProps {
    alt?: string;
    title?: string;
    src?: React.ReactNode;
    tooltip?: string;
    onLoad?: Function;
    subtitle?: string;
    objectFit?: string;
    isLoading?: boolean;
    insetShadow?: boolean;
    width?: number | string;
    height?: number | string;
    padding?: number | string;
    margin?: number | string;
    borderRadius?: number | string;
  }
  declare const ImageView: React.FC<ImageViewProps>

  // InputText
  interface InputTextProps {
    value?: any;
    label?: string;
    tooltip?: string;
    disabled?: boolean;
    onClick?: Function;
    onChange?: Function;
    onKeyUp?: Function;
    onKeyDown?: Function;
    placeholder?: string;
    width?: number | string;
    setStatus?: "default" | "success" | "danger" | "loading";
    type?: "text" | "password" | "date" | "time" | "month" | "datetime-local";
  }
  declare const InputText: React.FC<InputTextProps>

  // InputSearchBar
  interface InputSearchBarProps {
    placeholder?: string;
    onSubmit?: Function;
    onChange?: Function;
    onClick?: Function;
    onKeyUp?: Function;
    onKeyDown?: Function;
    disabled?: boolean;
    tooltip?: string;
    value?: any;
    width?: any;
    name?: any;
  }
  declare const InputSearchBar: React.FC<InputSearchBarProps>

  // InputSearchBox
  interface InputSearchBoxProps {
    placeholder?: string;
    onChange?: Function;
    onClick?: Function;
    onKeyUp?: Function;
    onKeyDown?: Function;
    disabled?: boolean;
    tooltip?: string;
    value?: any;
    width?: any;
    name?: any;
  }
  declare const InputSearchBox: React.FC<InputSearchBoxProps>

  // InputSearchSuggestion
  interface InputSearchSuggestionProps {
    placeholder?: string;
    disabled?: boolean;
    tooltip?: string;
    data?: string[];
    width?: any;
    onClick?: Function;
    onChange?: Function;
    onKeyUp?: Function;
    onKeyDown?: Function;
  }
  declare const InputSearchSuggestion: React.FC<InputSearchSuggestionProps>

  // Link
  interface LinkProps {
    to?: string;
    children?: React.ReactNode;
    style?: CSSProperties;
  }
  declare const Link: React.FC<LinkProps>

  // LinkCompound
  interface LinkCompoundProps {
    to?: string;
    imgSrc?: string | any;
    imgAlt?: string;
    icon?: React.ReactNode;
    type?: "default" | "border";
    title?: string;
    subtitle?: string;
    focused?: boolean;
    tooltip?: string;
    onClick?: () => void;
  }
  declare const LinkCompound: React.FC<LinkCompoundProps>

  // LoaderBar
  interface LoaderBarProps {
    isLoading?: boolean;
    setTheme?: string;
  }
  declare const LoaderBar: React.FC<LoaderBarProps>

  // LoaderBusy
  interface LoaderBusyProps {
    size?: string;
    setTheme?: string;
    isLoading?: boolean;
    backgroundColor?: string;
    onBackdropPress?: Function;
    display?: "default" | "overlay";
    title?: string;
  }
  declare const LoaderBusy: React.FC<LoaderBusyProps>

  // ListItem
  interface ListItemProps {
    to?: string;
    imgSrc?: string | any;
    imgAlt?: string;
    imgBorderRadius?: number | string;
    borderBottom?: boolean;
    title?: React.DetailedHTMLProps;
    subtitle?: string;
    info?: string;
    ItemEndComponent: React.ReactNode;
  }
  declare const ListItem: React.FC<ListItemProps>

  // MenuBar
  interface MenuBarProps {
    label?: string;
    data?: string[];
    searchPlaceholder?: string;
    showSearchBar?: boolean;
  }
  declare const MenuBar: React.FC<MenuBarProps>

  // ProgressBar
  interface ProgressBarProps {
    height?: number | string;
    icon?: React.ReactNode;
    showIcon?: boolean;
    setProgress?: number | string;
    color?: string | any;
    title?: string;
    subtitle?: string;
    tooltip?: string;
  }
  declare const ProgressBar: React.FC<ProgressBarProps>

  // ProgressBarIndeterminate
  interface ProgressBarIndeterminateProps {
    isLoading?: boolean;
  }
  declare const ProgressBarIndeterminate: React.FC<ProgressBarIndeterminateProps>

  // RadioButton
  interface RadioButtonProps {
    value?: any;
    name?: string;
    label?: string;
    tooltip?: string;
    disabled?: boolean;
    defaultChecked?: boolean;
    onChange?: () => void;
  }
  declare const RadioButton: React.FC<RadioButtonProps>

  // SliderBar
  interface SliderBarProps {
    min?: number;
    max?: number;
    step?: number;
    tooltip?: string;
    showValue?: boolean;
    showPopupValue?: boolean;
    thumbStyle?: string;
    defaultValue?: number;
    onChange?: () => void;
    onDragStart?: () => void;
    onDragEnd?: () => void;
  }
  declare const SliderBar: React.FC<SliderBarProps>

  // Select
  interface SelectProps {
    value?: string|number
    data: { label: number | string; value: number | string }[];
    defaultValue?: string | number;
    onChange?: (val: string | number) => void;
    tooltip?: string;
  }
  declare const Select: React.FC<SelectProps>

  // SelectNative
  interface SelectNativeProps {
    data: string[];
    name?: any;
    tooltip?: string;
  }
  declare const SelectNative: React.FC<SelectNativeProps>

  // Switch
  interface SwitchProps {
    defaultChecked?: boolean;
    disabled?: boolean;
    labelOn?: string;
    labelOff?: string;
    label?: boolean;
    tooltip?: string;
    onChange?: () => void;
    labelPosition?: "start" | "end";
    labelFixedWidth?: number | string;
  }
  declare const Switch: React.FC<SwitchProps>

  // TableView
  interface TableViewProps {
    columns?: any;
    rows?: any;
  }
  declare const TableView: React.FC<TableViewProps>

  // TextArea
  interface TextAreaProps {
    value?: any;
    disabled?: boolean;
    onChange?: Function;
    placeholder?: string;
    style?: CSSProperties
  }
  declare const TextArea: React.FC<TextAreaProps>
}