@props(['url'])
<tr>
<td class="header">
<a href="{{ $url }}" style="display: inline-block;">
@if (trim($slot) === 'Laravel')
<img src="https://imgs.search.brave.com/oQDgpm8Dje9aowjkeRCoBBFZCx64xhHivZF6pUgRZ6c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91c2Vy/LWltYWdlcy5naXRo/dWJ1c2VyY29udGVu/dC5jb20vNjc0NjIx/LzcxMTg3ODAxLTE0/ZTYwYTgwLTIyODAt/MTFlYS05NGM5LWU1/NjU3NmY3NmJhZi5w/bmc" class="logo" alt="Laravel Logo">
@else
{{ $slot }}
@endif
</a>
</td>
</tr>
