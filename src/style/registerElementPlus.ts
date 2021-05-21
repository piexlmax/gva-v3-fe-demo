import type { App } from 'vue';
import {
    ElAffix,
    ElAlert, ElAside, ElAutocomplete, ElAvatar, ElBacktop, ElBadge, ElBreadcrumb, ElBreadcrumbItem, ElButton, ElButtonGroup, ElCalendar, ElCard, ElCarousel, ElCarouselItem, ElCascader, ElCascaderPanel, ElCheckbox, ElCheckboxButton, ElCheckboxGroup, ElCheckTag, ElCol, ElCollapse, ElCollapseItem, ElCollapseTransition, ElColorPicker, ElContainer, ElDatePicker, ElDialog, ElDivider, ElDrawer, ElDropdown, ElDropdownItem, ElDropdownMenu, ElEmpty, ElFooter, ElForm, ElFormItem, ElHeader, ElIcon, ElImage, ElImageViewer, ElInfiniteScroll, ElInput, ElInputNumber, ElLink, ElLoading, ElMain, ElMenu, ElMenuItem, ElMenuItemGroup, ElMessage, ElMessageBox, ElNotification, ElOption, ElOptionGroup, ElPageHeader, ElPagination, ElPopconfirm, ElPopover, ElPopper, ElProgress, ElRadio, ElRadioButton, ElRadioGroup, ElRate, ElRow, ElScrollbar, ElSelect, ElSlider, ElStep, ElSteps, ElSubmenu, ElSwitch, ElTabPane, ElTable, ElTableColumn, ElTabs, ElTag, ElTimePicker, ElTimeSelect, ElTimeline, ElTimelineItem, ElTooltip, ElTransfer, ElTree, ElUpload, ElSpace, ElSkeleton, ElSkeletonItem, ElDescriptions, ElDescriptionsItem, ElResult
} from 'element-plus';

const components = [
    ElAffix,
    ElAlert, ElAside, ElAutocomplete, ElAvatar, ElBacktop, ElBadge, ElBreadcrumb, ElBreadcrumbItem, ElButton, ElButtonGroup, ElCalendar, ElCard, ElCarousel, ElCarouselItem, ElCascader, ElCascaderPanel, ElCheckbox, ElCheckboxButton, ElCheckboxGroup, ElCheckTag, ElCol, ElCollapse, ElCollapseItem, ElCollapseTransition, ElColorPicker, ElContainer, ElDatePicker, ElDialog, ElDivider, ElDrawer, ElDropdown, ElDropdownItem, ElDropdownMenu, ElEmpty, ElFooter, ElForm, ElFormItem, ElHeader, ElIcon, ElImage, ElImageViewer, ElInfiniteScroll, ElInput, ElInputNumber, ElLink, ElLoading, ElMain, ElMenu, ElMenuItem, ElMenuItemGroup, ElMessage, ElMessageBox, ElNotification, ElOption, ElOptionGroup, ElPageHeader, ElPagination, ElPopconfirm, ElPopover, ElPopper, ElProgress, ElRadio, ElRadioButton, ElRadioGroup, ElRate, ElRow, ElScrollbar, ElSelect, ElSlider, ElStep, ElSteps, ElSubmenu, ElSwitch, ElTabPane, ElTable, ElTableColumn, ElTabs, ElTag, ElTimePicker, ElTimeSelect, ElTimeline, ElTimelineItem, ElTooltip, ElTransfer, ElTree, ElUpload, ElSpace, ElSkeleton, ElSkeletonItem, ElDescriptions, ElDescriptionsItem, ElResult
];


export function setupElementPlus (app: App<Element>) {
    components.forEach(component => {
        app.use(component);
    });
}
