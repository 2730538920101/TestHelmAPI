{{- define "helm-test.labels" -}}
app.kubernetes.io/name: {{ .Chart.Name }}
app.kubernetes.io/version: {{ .Chart.Version }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}
