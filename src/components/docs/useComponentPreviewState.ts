import * as React from "react"

export function useComponentPreviewState() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview")
  const [controlsOpen, setControlsOpen] = React.useState(true)

  const [btnVariant, setBtnVariant] = React.useState<
    "default" | "outline" | "secondary" | "ghost" | "destructive" | "link"
  >("default")
  const [btnSize, setBtnSize] = React.useState<
    "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"
  >("default")
  const [btnLabel, setBtnLabel] = React.useState("Click Me")
  const [btnClicks, setBtnClicks] = React.useState(0)

  const [accType, setAccType] = React.useState<"single" | "multiple">("single")
  const [accCollapsible, setAccCollapsible] = React.useState(true)

  const [alVariant, setAlVariant] = React.useState<"default" | "destructive">("default")
  const [alTitle, setAlTitle] = React.useState("Heads up!")
  const [alDescription, setAlDescription] = React.useState(
    "This alert component runs universally on web and native devices."
  )

  const [badgeVariant, setBadgeVariant] = React.useState<
    "default" | "secondary" | "destructive" | "outline"
  >("default")
  const [badgeLabel, setBadgeLabel] = React.useState("Active")

  const [cardTitle, setCardTitle] = React.useState("Project Dashboard")
  const [cardDescription, setCardDescription] = React.useState(
    "Manage your team and track analytical metrics."
  )
  const [cardContentText, setCardContentText] = React.useState(
    "Your team has completed 12 tasks this week. Your average feedback score is 4.8/5."
  )

  const [inputValue, setInputValue] = React.useState("hello@kibra.dev")
  const [inputLabel, setInputLabel] = React.useState("Email address")
  const [inputError, setInputError] = React.useState("")

  const [textareaValue, setTextareaValue] = React.useState(
    "Explain why Kibra is the fastest styling engine."
  )

  const [skeletonLoading, setSkeletonLoading] = React.useState(true)

  const [isAlertOpen, setIsAlertOpen] = React.useState(false)
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false)
  const [isSwitchOn, setIsSwitchOn] = React.useState(false)
  const [radioValue, setRadioValue] = React.useState("comfortable")
  const [activeDemoTab, setActiveDemoTab] = React.useState("account")
  const [isToggledOn, setIsToggledOn] = React.useState(false)
  const [progressVal, setProgressVal] = React.useState(33)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [checkboxChecked, setCheckboxChecked] = React.useState(false)

  return {
    activeTab,
    setActiveTab,
    controlsOpen,
    setControlsOpen,
    btnVariant,
    setBtnVariant,
    btnSize,
    setBtnSize,
    btnLabel,
    setBtnLabel,
    btnClicks,
    setBtnClicks,
    accType,
    setAccType,
    accCollapsible,
    setAccCollapsible,
    alVariant,
    setAlVariant,
    alTitle,
    setAlTitle,
    alDescription,
    setAlDescription,
    badgeVariant,
    setBadgeVariant,
    badgeLabel,
    setBadgeLabel,
    cardTitle,
    setCardTitle,
    cardDescription,
    setCardDescription,
    cardContentText,
    setCardContentText,
    inputValue,
    setInputValue,
    inputLabel,
    setInputLabel,
    inputError,
    setInputError,
    textareaValue,
    setTextareaValue,
    skeletonLoading,
    setSkeletonLoading,
    isAlertOpen,
    setIsAlertOpen,
    isDialogOpen,
    setIsDialogOpen,
    isDrawerOpen,
    setIsDrawerOpen,
    isDropdownOpen,
    setIsDropdownOpen,
    isPopoverOpen,
    setIsPopoverOpen,
    isTooltipOpen,
    setIsTooltipOpen,
    isSwitchOn,
    setIsSwitchOn,
    radioValue,
    setRadioValue,
    activeDemoTab,
    setActiveDemoTab,
    isToggledOn,
    setIsToggledOn,
    progressVal,
    setProgressVal,
    isModalOpen,
    setIsModalOpen,
    checkboxChecked,
    setCheckboxChecked,
  }
}

export type ComponentPreviewState = ReturnType<typeof useComponentPreviewState>

export const INTERACTIVE_SLUGS = [
  "button",
  "accordion",
  "alert",
  "badge",
  "card",
  "input",
  "textarea",
  "skeleton",
  "alert-dialog",
  "dialog",
  "drawer",
  "dropdown-menu",
  "popover",
  "tooltip",
  "progress",
  "switch",
  "radio-group",
  "tabs",
  "toggle",
  "avatar",
  "aspect-ratio",
  "modal",
  "label",
  "separator",
  "checkbox",
] as const
