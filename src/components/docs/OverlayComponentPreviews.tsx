import { Text } from "react-native"
import { Sparkles, Sliders, Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { COMPONENT_DOCS } from "@/data/docs"
import type { ComponentPreviewState } from "./useComponentPreviewState"
import { INTERACTIVE_SLUGS } from "./useComponentPreviewState"

interface PreviewProps {
  slug: string
  state: ComponentPreviewState
  copiedText: string | null
  onCopy: (text: string, id: string) => void
}

export function OverlayComponentPreviews({ slug, state, copiedText, onCopy }: PreviewProps) {
  const s = state

  return (
    <>
      {slug === "alert-dialog" && (
        <div className="flex flex-col items-center gap-4">
          <Button onClick={() => s.setIsAlertOpen(true)}>Delete Account</Button>
          {s.isAlertOpen && (
            <div className="absolute inset-0 z-10 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white dark:bg-slate-900 border border-border/80 rounded-xl p-5 shadow-xl max-w-sm w-full space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">Are you absolutely sure?</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  This action cannot be undone. This will permanently delete your account and remove all data from our
                  servers.
                </p>
                <div className="flex justify-end gap-2 flex-row">
                  <button
                    onClick={() => s.setIsAlertOpen(false)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-border hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => s.setIsAlertOpen(false)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
                  >
                    Yes, delete account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {slug === "dialog" && (
        <div className="flex flex-col items-center gap-4">
          <Button onClick={() => s.setIsDialogOpen(true)}>Edit Profile</Button>
          {s.isDialogOpen && (
            <div className="absolute inset-0 z-10 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white dark:bg-slate-900 border border-border/80 rounded-xl p-5 shadow-xl max-w-sm w-full space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">Edit Profile</h3>
                  <p className="text-xs text-slate-500">Make changes to your profile. Click save when done.</p>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] font-semibold text-slate-500 block mb-1">Name</label>
                    <input
                      type="text"
                      defaultValue="Pedro Duarte"
                      className="w-full text-xs p-1.5 border border-border bg-white dark:bg-slate-950 text-foreground rounded-md outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-slate-500 block mb-1">Username</label>
                    <input
                      type="text"
                      defaultValue="@peduarte"
                      className="w-full text-xs p-1.5 border border-border bg-white dark:bg-slate-950 text-foreground rounded-md outline-none"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 flex-row">
                  <button
                    onClick={() => s.setIsDialogOpen(false)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-border hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => s.setIsDialogOpen(false)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-primary hover:bg-primary/80 text-primary-foreground transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {slug === "drawer" && (
        <div className="flex flex-col items-center gap-4">
          <Button onClick={() => s.setIsDrawerOpen(true)}>Open Drawer</Button>
          {s.isDrawerOpen && (
            <div className="absolute inset-0 z-10 bg-slate-900/50 backdrop-blur-sm flex items-end justify-center">
              <div className="bg-white dark:bg-slate-900 border-t border-border/80 rounded-t-2xl p-5 shadow-xl w-full space-y-4">
                <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mx-auto" />
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 text-center font-sans">
                    Goal Setting
                  </h3>
                  <p className="text-xs text-slate-500 text-center">Set your daily calorie burnt targets.</p>
                </div>
                <div className="flex items-center justify-center gap-6 py-4 flex-row">
                  <button className="size-10 rounded-full border border-border flex items-center justify-center text-lg font-semibold text-slate-700 dark:text-slate-300">
                    -
                  </button>
                  <span className="text-3xl font-extrabold text-slate-900 dark:text-slate-50 font-sans">350</span>
                  <button className="size-10 rounded-full border border-border flex items-center justify-center text-lg font-semibold text-slate-700 dark:text-slate-300">
                    +
                  </button>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => s.setIsDrawerOpen(false)}
                    className="w-full py-2 text-xs font-semibold rounded-lg bg-primary hover:bg-primary/80 text-primary-foreground transition-colors"
                  >
                    Submit Target
                  </button>
                  <button
                    onClick={() => s.setIsDrawerOpen(false)}
                    className="w-full py-2 text-xs font-semibold rounded-lg border border-border hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {slug === "dropdown-menu" && (
        <div className="relative">
          <Button onClick={() => s.setIsDropdownOpen(!s.isDropdownOpen)}>Open Menu</Button>
          {s.isDropdownOpen && (
            <div className="absolute top-10 right-0 z-10 bg-white dark:bg-slate-900 border border-border/80 rounded-lg shadow-xl p-1 w-44 space-y-0.5">
              <div className="px-2 py-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-left">
                My Account
              </div>
              <button
                onClick={() => s.setIsDropdownOpen(false)}
                className="w-full text-left px-2 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
              >
                Profile
              </button>
              <button
                onClick={() => s.setIsDropdownOpen(false)}
                className="w-full text-left px-2 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
              >
                Settings
              </button>
              <div className="border-t border-border/80 my-1" />
              <button
                onClick={() => s.setIsDropdownOpen(false)}
                className="w-full text-left px-2 py-1.5 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-md transition-colors"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      )}

      {slug === "popover" && (
        <div className="relative">
          <Button onClick={() => s.setIsPopoverOpen(!s.isPopoverOpen)}>Open Popover</Button>
          {s.isPopoverOpen && (
            <div className="absolute top-10 left-1/2 -translate-x-1/2 z-10 bg-white dark:bg-slate-900 border border-border/80 rounded-xl shadow-xl p-4 w-64 space-y-2">
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-50 text-left">Dimensions</h4>
              <p className="text-[11px] text-slate-500 mb-2 text-left">Set the default dimensions for your artboard.</p>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between items-center flex-row">
                  <span className="text-slate-500">Width</span>
                  <input
                    type="text"
                    defaultValue="100%"
                    className="w-16 p-1 border border-border bg-slate-50 dark:bg-slate-950 text-foreground text-center rounded outline-none"
                  />
                </div>
                <div className="flex justify-between items-center flex-row">
                  <span className="text-slate-500">Height</span>
                  <input
                    type="text"
                    defaultValue="350px"
                    className="w-16 p-1 border border-border bg-slate-50 dark:bg-slate-950 text-foreground text-center rounded outline-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {slug === "tooltip" && (
        <div className="relative flex items-center justify-center">
          <button
            onMouseEnter={() => s.setIsTooltipOpen(true)}
            onMouseLeave={() => s.setIsTooltipOpen(false)}
            onClick={() => s.setIsTooltipOpen(!s.isTooltipOpen)}
            className="px-4 py-2 text-xs font-semibold rounded-lg border border-border hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-foreground cursor-pointer"
          >
            Hover or Tap me
          </button>
          {s.isTooltipOpen && (
            <div className="absolute -top-10 z-10 bg-slate-950 text-slate-50 text-[10px] py-1 px-2.5 rounded shadow-lg whitespace-nowrap animate-bounce">
              Add to library
              <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-950 rotate-45" />
            </div>
          )}
        </div>
      )}

      {slug === "progress" && (
        <div className="w-full space-y-4">
          <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 flex-row">
            <span>Installation Progress</span>
            <span>{s.progressVal}%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div style={{ width: `${s.progressVal}%` }} className="h-full bg-kibra-primary transition-all duration-300" />
          </div>
          <div className="flex justify-center">
            <Button size="sm" variant="outline" onClick={() => s.setProgressVal((v) => (v >= 100 ? 0 : v + 10))}>
              Increment
            </Button>
          </div>
        </div>
      )}

      {slug === "switch" && (
        <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-white dark:bg-slate-900 w-full max-w-sm flex-row">
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Airplane Mode</span>
          <button
            onClick={() => s.setIsSwitchOn(!s.isSwitchOn)}
            className={`w-11 h-6 rounded-full transition-colors relative duration-300 cursor-pointer ${s.isSwitchOn ? "bg-kibra-primary" : "bg-slate-200 dark:bg-slate-800"}`}
          >
            <div
              className={`size-4 rounded-full bg-white absolute top-1 transition-all duration-300 shadow-sm ${s.isSwitchOn ? "left-6" : "left-1"}`}
            />
          </button>
        </div>
      )}

      {slug === "radio-group" && (
        <div className="space-y-2 w-full max-w-sm">
          {["default", "comfortable", "compact"].map((option) => (
            <button
              key={option}
              onClick={() => s.setRadioValue(option)}
              className="w-full flex items-center justify-between p-2.5 rounded-lg border border-border bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-950/20 text-xs text-foreground cursor-pointer transition-colors flex-row"
            >
              <span className="capitalize">{option} theme</span>
              <div
                className={`size-4 rounded-full border border-border flex items-center justify-center p-0.5 ${s.radioValue === option ? "border-kibra-primary bg-kibra-primary/10 dark:bg-kibra-primary-dark/30" : ""}`}
              >
                {s.radioValue === option && <div className="size-2 rounded-full bg-kibra-primary" />}
              </div>
            </button>
          ))}
        </div>
      )}

      {slug === "tabs" && (
        <div className="w-full border border-border/80 rounded-xl bg-white dark:bg-slate-900 p-4 space-y-3">
          <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-lg flex-row">
            {["account", "password"].map((tab) => (
              <button
                key={tab}
                onClick={() => s.setActiveDemoTab(tab)}
                className={`flex-1 text-center py-1 text-xs font-semibold rounded-md capitalize cursor-pointer transition-all ${s.activeDemoTab === tab ? "bg-white dark:bg-slate-900 shadow-sm text-foreground" : "text-slate-500"}`}
              >
                {tab}
              </button>
            ))}
          </div>
          {s.activeDemoTab === "account" ? (
            <div className="space-y-2 text-xs text-left">
              <p className="text-slate-500 text-[11px]">Make changes to your account settings here.</p>
              <input
                type="text"
                placeholder="Pedro Duarte"
                className="w-full p-1.5 border border-border rounded-md bg-white dark:bg-slate-950 text-foreground outline-none"
              />
            </div>
          ) : (
            <div className="space-y-2 text-xs text-left">
              <p className="text-slate-500 text-[11px]">Change your account password here.</p>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full p-1.5 border border-border rounded-md bg-white dark:bg-slate-950 text-foreground outline-none"
              />
            </div>
          )}
        </div>
      )}

      {slug === "toggle" && (
        <button
          onClick={() => s.setIsToggledOn(!s.isToggledOn)}
          className={`p-3 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${s.isToggledOn ? "bg-kibra-primary/10 dark:bg-kibra-primary-dark/30 border-kibra-primary/30 text-kibra-primary-dark dark:text-kibra-primary font-bold" : "border-border bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"}`}
        >
          <Sliders className="size-4" />
        </button>
      )}

      {slug === "avatar" && (
        <div className="flex items-center gap-4 flex-row">
          <div className="size-12 rounded-full overflow-hidden border border-border bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-sans font-semibold text-slate-800 dark:text-slate-200">
            <img
              src="https://github.com/shadcn.png"
              className="w-full h-full object-cover"
              alt="User avatar"
              onError={(e) => {
                e.currentTarget.style.display = "none"
              }}
            />
            <span>CN</span>
          </div>
          <div className="size-12 rounded-full overflow-hidden border border-border bg-kibra-primary/10 dark:bg-kibra-primary-dark/30 flex items-center justify-center font-sans font-bold text-kibra-primary-dark dark:text-kibra-primary text-sm">
            JD
          </div>
        </div>
      )}

      {slug === "aspect-ratio" && (
        <div className="w-full max-w-sm rounded-xl overflow-hidden border border-border bg-slate-100 dark:bg-slate-800 aspect-video relative">
          <img
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&q=80"
            className="w-full h-full object-cover"
            alt="Landscape preview"
          />
          <div className="absolute top-2 left-2 bg-slate-950/70 text-slate-50 text-[10px] font-bold px-2 py-0.5 rounded">
            Ratio: 16:9
          </div>
        </div>
      )}

      {slug === "modal" && (
        <div className="flex flex-col items-center gap-4">
          <Button onClick={() => s.setIsModalOpen(true)}>Open Modal</Button>
          <Modal
            visible={s.isModalOpen}
            onClose={() => s.setIsModalOpen(false)}
            title="Confirm action"
            description="Are you sure you want to continue? This action is irreversible."
          >
            <div className="flex flex-row gap-3 mt-4">
              <button
                onClick={() => s.setIsModalOpen(false)}
                className="flex-1 py-2 text-xs font-semibold rounded-lg border border-border hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => s.setIsModalOpen(false)}
                className="flex-1 py-2 text-xs font-semibold rounded-lg bg-primary hover:bg-primary/80 text-primary-foreground transition-colors"
              >
                Confirm
              </button>
            </div>
          </Modal>
        </div>
      )}

      {slug === "label" && (
        <div className="flex flex-col items-center gap-2">
          <Label>This is an accessible label</Label>
        </div>
      )}

      {slug === "separator" && (
        <div className="w-full max-w-xs space-y-3">
          <Text className="text-xs text-slate-500 font-semibold font-sans">Kibra Framework</Text>
          <Separator />
          <div className="flex h-5 items-center text-xs font-sans text-slate-700 dark:text-slate-300 flex-row">
            <span>Blog</span>
            <Separator orientation="vertical" className="mx-3" />
            <span>Docs</span>
            <Separator orientation="vertical" className="mx-3" />
            <span>Source</span>
          </div>
        </div>
      )}

      {slug === "checkbox" && (
        <div className="flex items-center gap-3 flex-row">
          <Checkbox checked={s.checkboxChecked} onCheckedChange={s.setCheckboxChecked} />
          <Label onClick={() => s.setCheckboxChecked(!s.checkboxChecked)} className="cursor-pointer select-none">
            Accept terms and conditions
          </Label>
        </div>
      )}

      {!(INTERACTIVE_SLUGS as readonly string[]).includes(slug) && (
        <div className="w-full max-w-lg space-y-4">
          <div className="text-center p-4 border border-dashed border-border rounded-xl bg-slate-100/40 dark:bg-slate-900/10">
            <Sparkles className="size-8 text-kibra-primary mx-auto mb-2 animate-pulse" />
            <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              Interactive Web Simulation Coming Soon
            </h4>
            <p className="text-xs text-muted-foreground max-w-xs mx-auto mt-1">
              This component runs natively on Expo and iOS/Android. See the quick usage example below!
            </p>
          </div>
          <div className="relative group rounded-xl overflow-hidden border border-border bg-white dark:bg-slate-900 font-mono text-[11px] sm:text-xs leading-relaxed shadow-sm">
            <div className="flex items-center justify-between px-3 py-1.5 bg-slate-50/50 dark:bg-slate-900/50 border-b border-border">
              <span className="text-[10px] text-muted-foreground font-sans">Quick Usage Snippet</span>
              <button
                onClick={() => onCopy(COMPONENT_DOCS[slug].usage, "quick-usage")}
                className="p-1 text-muted-foreground hover:text-foreground cursor-pointer transition-colors flex items-center gap-1"
              >
                {copiedText === "quick-usage" ? (
                  <>
                    <Check className="size-3 text-green-500" />
                    <span className="text-[10px] text-green-500 font-sans">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3" />
                    <span className="text-[10px] font-sans">Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 overflow-x-auto text-slate-700 dark:text-slate-300 max-h-[220px]">
              <code>{COMPONENT_DOCS[slug].usage}</code>
            </pre>
          </div>
        </div>
      )}
    </>
  )
}
