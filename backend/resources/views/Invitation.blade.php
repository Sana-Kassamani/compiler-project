@component('mail::message')

<h1>{{ $name }} sent you an invite</h1>
@component('mail::button' , ['url' => 'https://www.google.com'])
 Accept Invitation
@endcomponent
@endcomponent